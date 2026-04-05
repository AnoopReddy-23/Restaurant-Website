//create router to handle order API reqs
const exp=require('express')
const orderApp=exp.Router()

//import express-async-handler to handle async errors
const expressAsyncHandler=require('express-async-handler')
const { ObjectId } = require('mongodb')

//to extract body of request object
orderApp.use(exp.json());

// (ORDER API)

// POST /create-order: Save a new order
orderApp.post('/create-order', expressAsyncHandler(async (request, response) => {
    let orderCollectionObject = request.app.get("orderCollectionObject");
    let cartCollectionObject = request.app.get("cartCollectionObject");
    let orderObj = request.body;

    // Add status and date
    orderObj.status = "Placed";
    orderObj.orderDate = new Date();

    // Insert order
    await orderCollectionObject.insertOne(orderObj);
    
    // Clear user's cart after order is placed
    await cartCollectionObject.deleteMany({ username: orderObj.username });

    response.send({ message: "Order placed successfully!", payload: orderObj });
}));

// GET /get-orders/:username: Get orders for a specific user
orderApp.get('/get-orders/:username', expressAsyncHandler(async (request, response) => {
    let orderCollectionObject = request.app.get("orderCollectionObject");
    let username = request.params.username;
    
    let orders = await orderCollectionObject.find({ username: username }).sort({ orderDate: -1 }).toArray();
    response.send({ message: "Order history", payload: orders });
}));

// GET /all-orders: Get all orders (Admin only)
orderApp.get('/all-orders', expressAsyncHandler(async (request, response) => {
    let orderCollectionObject = request.app.get("orderCollectionObject");
    
    let orders = await orderCollectionObject.find().sort({ orderDate: -1 }).toArray();
    response.send({ message: "All system orders", payload: orders });
}));

// PUT /update-status: Update order status (Admin only)
orderApp.put('/update-status', expressAsyncHandler(async (request, response) => {
    let orderCollectionObject = request.app.get("orderCollectionObject");
    let { orderId, status } = request.body;

    await orderCollectionObject.updateOne(
        { _id: new ObjectId(orderId) },
        { $set: { status: status } }
    );

    response.send({ message: "Order status updated successfully!" });
}));

module.exports = orderApp;
