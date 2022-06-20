//create router to handle user API reqs
const exp=require('express')
const cartApp=exp.Router()

//import express-async-handler to handler async errors
const expressAsyncHandler=require('express-async-handler')


//import dotenv which gives "process.env"
require('dotenv').config()


//import cloudinary, multer, multer-storage-cloudinary
var cloudinary=require('cloudinary').v2
const {CloudinaryStorage}=require('multer-storage-cloudinary')
const multer=require('multer')
const { ObjectId } = require('mongodb')

//configure cloudinary
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
})

//configure cloudinary storage
const cloudinaryStorage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params: async (req,file)=>{
        return{
            folder:"Restaurant Website",
            public_id:file.fieldname + "-" + Date.now(),
        }
    }
})

//configure multer
var upload=multer({storage:cloudinaryStorage})


//to extract body of request object
cartApp.use(exp.json());  //inbuit middleware ----> this middleware executes for each and every request



// (CART API)


//create route to handle '/create-cartItem' path
//here we have inserted cartObj using async/await
//handling aynchronous errors using express-async-handler
cartApp.post('/create-cart',expressAsyncHandler(async (request,response)=>{
   
    //get productCollectionObject from app.js
    let cartCollectionObject=request.app.get("cartCollectionObject");
    //get productObj from request
    let cartObj=request.body;
    //search for user by username
    let productOfDB=await cartCollectionObject.findOne({food:cartObj.food,username:cartObj.username});
    //console.log(productOfDB)
    //if product existed
    if(productOfDB!==null){
        response.send({message:"Item is already added!!"})
    }
    if(productOfDB===null){
        //insert productObj
        await cartCollectionObject.insertOne(cartObj)
        //sending response
        response.send({message:'Item added to cart Successfully!'})
    }
}))


//create route to handle '/getcartitems' path   
cartApp.get('/getcartitems/:name', expressAsyncHandler(async (request,response)=>{
   
    //get productCollectionObject from app.js
    let cartCollectionObject=request.app.get("cartCollectionObject");
    //read all products
    let products=await cartCollectionObject.find({username:(request.params.name)}).toArray()  //converts the cursors to array
    //console.log(products)
    //sending response
    response.send({message:'All products',payload:products})
}))



//create route to handle '/update-user' path
cartApp.put('/update-cartitem',expressAsyncHandler(async (request,response)=>{
    //get userCollectionObject from app.js
    let cartCollectionObject=request.app.get("cartCollectionObject");
    //get modified user Obj from request
    let modifiedItem=request.body;
    //console.log(modifiedItem)
    delete modifiedItem._id
    //update the user
    await cartCollectionObject.updateOne({username:modifiedItem.username,food:modifiedItem.food},{$set:{...modifiedItem}})
    //send response
    response.send({message:"Producter details Modified"})
    
}))


//create route to handle '/remove-cartitem' path
cartApp.delete('/remove-cartitem/:id', expressAsyncHandler(async (request,response)=>{

    //get productCollectionObject from app.js
    let cartCollectionObject=request.app.get("cartCollectionObject");
    //get productId from url param
    //let pid=request.params.id
    //delete the product
    await cartCollectionObject.deleteOne({_id:new ObjectId(request.params.id)})
    
    // console.log(res)
    // let products=await cartCollectionObject.find().toArray() 
    // console.log(pid,products)
    //send response
    response.send({message:"Product deleted"})
}))


module.exports=cartApp;