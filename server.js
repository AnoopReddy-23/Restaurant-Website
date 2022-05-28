//creating express app
const exp=require('express') //returns functions
const app=exp() //express obj--->contains http server object

//importing MongoClient
const mclient=require("mongodb").MongoClient;

//import path module (core module)
const path=require('path')
//connect build of react app with nodejs
app.use(exp.static(path.join(__dirname,'./build')))

//import .env
require('dotenv').config()

//import userApp and productApp
const userApp=require('./APIS/userApi');
const productApp=require('./APIS/productApi');
const cartApp=require('./APIS/cartApi')


//DB connection URL
const DBurl=process.env.DATABASE_CONNECTION



//connect with mongodb server
mclient.connect(DBurl)
.then((client)=>{

    //get db object
    let dbObj=client.db("restaurantwebsite");

    //create collection objects
    let userCollectionObject=dbObj.collection("usercollection");
    let productCollectionObject=dbObj.collection("productcollection");
    let cartCollectionObject=dbObj.collection("cartCollectionObject")

    //sharing collection objects with API's
    app.set("userCollectionObject", userCollectionObject) 
    app.set("productCollectionObject", productCollectionObject)
    app.set("cartCollectionObject", cartCollectionObject)

    console.log("DB connection success")
})
.catch(err=>console.log("Error in DB connection", err))



//use middleware to execute for a specific path
app.use('/user-api',userApp)
app.use('/product-api',productApp)
app.use('/cart-api',cartApp)


//dealing with page refersh
app.use('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
})

//handling invalid path by using middleware
app.use((request,response,next)=>{
    response.send({message:`Path ${request.url} is Invalid`});
})



//Error handling middleware
app.use((error,request,response,next)=>{
    response.send({message:"Error occured",reason:`${error.message}`})
})


//assign port number
app.listen(process.env.PORT,()=>console.log(`Server running on port number ${process.env.PORT}`))