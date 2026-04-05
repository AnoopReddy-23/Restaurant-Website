//create router to handle order API reqs
const exp = require('express')
const orderApp = exp.Router()

//import express-async-handler to handle async errors
const expressAsyncHandler = require('express-async-handler')
const { ObjectId } = require('mongodb')

//to extract body of request object
orderApp.use(exp.json())

// (ORDER API)

// POST /create-order: Save a new order
orderApp.post(
  '/create-order',
  expressAsyncHandler(async (request, response) => {
    let orderCollectionObject = request.app.get('orderCollectionObject')
    let cartCollectionObject = request.app.get('cartCollectionObject')
    let orderObj = request.body

    // Add status and date
    orderObj.status = 'Placed'
    orderObj.orderDate = new Date()

    // Insert order (including the deliveryAddress provided by client)
    await orderCollectionObject.insertOne(orderObj)

    // Clear user's cart after order is placed
    await cartCollectionObject.deleteMany({ username: orderObj.username })

    response.send({ message: 'Order placed successfully!', payload: orderObj })
  }),
)

// GET /get-orders/:username: Get orders for a specific user
orderApp.get(
  '/get-orders/:username',
  expressAsyncHandler(async (request, response) => {
    let orderCollectionObject = request.app.get('orderCollectionObject')
    let username = request.params.username

    let orders = await orderCollectionObject
      .find({ username: username })
      .sort({ orderDate: -1 })
      .toArray()
    response.send({ message: 'Order history', payload: orders })
  }),
)

// GET /all-orders: Get all orders (Admin only)
orderApp.get(
  '/all-orders',
  expressAsyncHandler(async (request, response) => {
    let orderCollectionObject = request.app.get('orderCollectionObject')

    let orders = await orderCollectionObject
      .find()
      .sort({ orderDate: -1 })
      .toArray()
    response.send({ message: 'All system orders', payload: orders })
  }),
)

// PUT /update-status: Update order status (Admin only)
orderApp.put(
  '/update-status',
  expressAsyncHandler(async (request, response) => {
    let orderCollectionObject = request.app.get('orderCollectionObject')
    let { orderId, status } = request.body

    await orderCollectionObject.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status: status } },
    )
    response.send({ message: 'Order status updated successfully!' })
  }),
)

// GET /sales-stats: Advanced Aggregate data for Admin Analytics
orderApp.get(
  '/sales-stats',
  expressAsyncHandler(async (request, response) => {
    let orderCollectionObject = request.app.get('orderCollectionObject')
    const { timeframe } = request.query

    // Calculate start date based on timeframe
    let startDate = new Date()
    if (timeframe === 'week') startDate.setDate(startDate.getDate() - 7)
    else if (timeframe === 'month') startDate.setMonth(startDate.getMonth() - 1)
    else if (timeframe === 'year') startDate.setFullYear(startDate.getFullYear() - 1)
    else startDate = new Date(0) // Lifetime

    const matchStage = { $match: { orderDate: { $gte: startDate } } }

    // 1. Overall Metrics
    const metrics = await orderCollectionObject.aggregate([
      matchStage,
      {
        $group: {
          _id: null,
          revenue: { $sum: '$totalAmount' },
          count: { $sum: 1 },
        },
      },
    ]).toArray()

    // 2. Top 5 Popular Products
    const topProducts = await orderCollectionObject.aggregate([
      matchStage,
      { $unwind: '$items' },
      { $group: { _id: '$items.food', value: { $sum: '$items.count' } } },
      { $sort: { value: -1 } },
      { $limit: 5 },
      { $project: { name: '$_id', value: 1, _id: 0 } },
    ]).toArray()

    // 3. Sales Trend (Revenue & Status Counts)
    const salesTrend = await orderCollectionObject.aggregate([
      matchStage,
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$orderDate' } },
          revenue: { $sum: '$totalAmount' },
          delivered: { $sum: { $cond: [{ $eq: ['$status', 'Delivered'] }, 1, 0] } },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'Placed'] }, 1, 0] } },
          preparing: { $sum: { $cond: [{ $eq: ['$status', 'Preparing'] }, 1, 0] } },
          delivery: { $sum: { $cond: [{ $eq: ['$status', 'Out for Delivery'] }, 1, 0] } },
        },
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          date: '$_id',
          revenue: 1,
          delivered: 1,
          pending: 1,
          preparing: 1,
          delivery: 1,
          _id: 0,
        },
      },
    ]).toArray()

    // 4. Status Distribution (Pie Chart)
    const statusDistribution = await orderCollectionObject.aggregate([
      matchStage,
      { $group: { _id: '$status', value: { $sum: 1 } } },
      { $project: { name: '$_id', value: 1, _id: 0 } },
    ]).toArray()

    response.send({
      message: 'Analytics fetched successfully',
      payload: {
        stats: {
          revenue: metrics[0]?.revenue || 0,
          orders: metrics[0]?.count || 0,
        },
        topProducts,
        salesTrend,
        statusDistribution,
      },
    })
  }),
)

module.exports = orderApp
