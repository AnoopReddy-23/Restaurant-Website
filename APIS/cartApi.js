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
    // //search for user by username
    // let productOfDB=await productCollectionObject.findOne({food:productObj.food});
    // //if product existed
    // if(productOfDB!==null){
    //     response.send({message:"Item is already added!!"})
    // }
    // else{
        // //add profile image link to newUserObj
        // productObj.foodImg=request.file.path
        // //remove photo property
        // delete productObj.foodphoto
        //insert productObj
        await cartCollectionObject.insertOne(cartObj)
        //sending response
        response.send({message:'Item added to cart Successfully!'})
    //}
}))


//create route to handle '/getcartitems' path   
cartApp.get('/getcartitems', expressAsyncHandler(async (request,response)=>{
   
    //get productCollectionObject from app.js
    let cartCollectionObject=request.app.get("cartCollectionObject");
    //read all products
    let products=await cartCollectionObject.find().toArray()  //converts the cursors to array
    //sending response
    response.send({message:'All products',payload:products})
}))


module.exports=cartApp;