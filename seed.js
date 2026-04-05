const { MongoClient } = require('mongodb')
require('dotenv').config()
const fs = require('fs')

async function seedDatabase() {
  const uri = process.env.DATABASE_CONNECTION

  if (!uri) {
    console.error('❌ ERROR: No DATABASE_CONNECTION string found in .env')
    process.exit(1)
  }

  const client = new MongoClient(uri)

  try {
    console.log('⏳ Connecting to MongoDB...')
    await client.connect()

    const db = client.db('restaurantwebsite')
    const productCollection = db.collection('productcollection')

    // 1. Delete all existing products in a clean sweep
    console.log('🧹 Wiping existing products from the database...')
    const deleteResult = await productCollection.deleteMany({})
    console.log(`✅ Deleted ${deleteResult.deletedCount} old products`)

    // 2. Read the new premium dataset
    console.log('📖 Reading premium menu items...')
    const rawData = fs.readFileSync('menu_items.json', 'utf8')
    const newItems = JSON.parse(rawData)

    // 3. Insert the new items directly into MongoDB
    console.log('🚀 Inserting new premium menu into database...')
    const insertResult = await productCollection.insertMany(newItems)

    console.log(
      `🎉 SUCCESS! Added ${insertResult.insertedCount} luxury dishes to the platform!`,
    )
  } catch (err) {
    console.error('❌ Seeding failed:', err)
  } finally {
    await client.close()
    console.log('🔌 Database connection closed. Ready for launch.')
  }
}

seedDatabase()
