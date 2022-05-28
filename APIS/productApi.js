//create router to handle user API reqs
const exp=require('express')
const productApp=exp.Router()

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
productApp.use(exp.json());  //inbuit middleware ----> this middleware executes for each and every request

//create REST API (PRODUCT API)

//create route to handle '/getproducts' path   
productApp.get('/getproducts', expressAsyncHandler(async (request,response)=>{
   
    //get productCollectionObject from app.js
    let productCollectionObject=request.app.get("productCollectionObject");
    //read all products
    let products=await productCollectionObject.find().toArray()  //converts the cursors to array
    //sending response
    response.send({message:'All products',payload:products})
}))

//create route to handle '/getproduct/id' path
productApp.get('/getproduct/:id',expressAsyncHandler(async (request,response)=>{
    //get productCollectionObject from app.js
    let productCollectionObject=request.app.get("productCollectionObject");
    //get productId from url param
    let pid=(+request.params.id);
    //get product by id
    let product=await productCollectionObject.findOne({productId:pid})
    //if product not found
    if(product==null){
        response.send({message:"Product not found"})
    }
    //if product found
    else{
        response.send({message:"Product found",payload:product})
    }
}))

// //create route to handle '/create-product' path
// //here we have inserted productObj using callback fun
// productApp.post('/create-product',(request,response)=>{
    
//     //get productCollectionObject from app.js
//     let productCollectionObject=request.app.get("productCollectionObject");

//     //get productObj from request
//     let productObj=request.body;

//     //insert productObj
//    productCollectionObject.insertOne(productObj,(err,result)=>{
//        if(err){
//            console.log("error in creating object", err)
//        }
//        else{
//            response.send({message:'New Product created successfully!!!'})
//        }
//    })
    
// })


// //create route to handle '/create-product' path
// //here we have inserted productObj using promise
// productApp.post('/create-product',(request,response)=>{
    
//     //get productCollectionObject from app.js
//     let productCollectionObject=request.app.get("productCollectionObject");

//     //get productObj from request
//     let productObj=request.body;

//     //insert productObj
//    productCollectionObject.insertOne(productObj)
//    .then(result=>response.send({message:'New Product created Successfully!!'}))
//    .catch(err=>console.log("error in creating product", err))
    
// })


// //create route to handle '/create-product' path
// //here we have inserted productObj using async/await
// //handling aynchronous errors using try and catch
// productApp.post('/create-product',async (request,response,next)=>{
//     try{
        
//         //get productCollectionObject from app.js
//         let productCollectionObject=request.app.get("productCollectionObject");

//         //get productObj from request
//         let productObj=request.body;

//         //insert productObj
//         let result=await productCollectionObject.insertOne(productObj)
//         //sending response
//         response.send({message:'New Product created Successfully!'})
//     }
//     catch(err){
//         //handover error obj to error handling middleware
//         next(err);
//     }
// })


//create route to handle '/create-product' path
//here we have inserted productObj using async/await
//handling aynchronous errors using express-async-handler
productApp.post('/create-product',upload.single("foodphoto"),expressAsyncHandler(async (request,response)=>{
   
        //get productCollectionObject from app.js
        let productCollectionObject=request.app.get("productCollectionObject");
        //get productObj from request
        let productObj=JSON.parse(request.body.productObj);
        //search for user by username
        let productOfDB=await productCollectionObject.findOne({food:productObj.food});
        //if product existed
        if(productOfDB!==null){
            response.send({message:"Item is already added!!"})
        }
        else{
            //add profile image link to newUserObj
            productObj.foodImg=request.file.path
            //remove photo property
            delete productObj.foodphoto
            //insert productObj
            await productCollectionObject.insertOne(productObj)
            //sending response
            response.send({message:'New Product created Successfully!'})
        }
}))


//create route to handle '/update-product' path
productApp.put('/update-product', expressAsyncHandler(async (request,response)=>{

        //get productCollectionObject from app.js
        let productCollectionObject=request.app.get("productCollectionObject");
        //get modified product Obj from request
        let modifiedProduct=request.body;
        //update the product
        await productCollectionObject.updateOne({productId:modifiedProduct.productId},{$set:{...modifiedProduct}})
        //send response
        response.send({message:"Product Modified",payload:modifiedProduct})
}))

//create route to handle '/remove-product' path
productApp.delete('/remove-product/:id', expressAsyncHandler(async (request,response)=>{

    //get productCollectionObject from app.js
    let productCollectionObject=request.app.get("productCollectionObject");
    //get productId from url param
    let pid=(+request.params.id)
    //delete the product
    await productCollectionObject.deleteOne({productId:pid})
    //send response
    response.send({message:"Product deleted"})
}))


module.exports=productApp;