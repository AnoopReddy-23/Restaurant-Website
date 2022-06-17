//create router to handle user API reqs
const exp=require('express')
const userApp=exp.Router()

//import express-async-handler to handler async errors
const expressAsyncHandler=require('express-async-handler')

//import bcryptjs for hashing password
const bcryptjs=require('bcryptjs')

//import jsonwebtoken for creating token
const jwt=require('jsonwebtoken')

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
userApp.use(exp.json());  //inbuit middleware ----> this middleware executes for each and every request

// //creating a middleware
// const middleware1=(request,response,next)=>{
//     console.log("Middleware-1 executed");
    
//     //response.send("Unauthorized req")
//     //forward req to next
//     next();
// }

// //to execute middlewate for each req
// userApp.use(middleware1)

//create REST API

//create route to handle '/getusers' path   //middleware2 --> to execute for a specific request
userApp.get('/getusers',expressAsyncHandler(async (request,response)=>{
    
    //get userCollectionObject from app.js
    let userCollectionObject=request.app.get("userCollectionObject");
    //read all users
    let users=await userCollectionObject.find().toArray()  //converts the cursors to array
    //sending response
    response.send({message:'All users',payload:users})
}))

//create route to handle '/getuser/id' path
userApp.post('/login',expressAsyncHandler(async (request,response)=>{

    //get userCollectionObject
    let userCollectionObject=request.app.get("userCollectionObject");
    //get new credential obj from req
    let newCredObj=request.body;
    //search for user by username
    let userOfDB=await userCollectionObject.findOne({username:newCredObj.username});
    //if userOfDB not existed
    if(userOfDB==null){
        response.send({message:"Invalid username"})
    }
    //if userOfDB exited
    else{
        if(newCredObj.userType===userOfDB.usertype){

            //compare passwords
            let status=await bcryptjs.compare(newCredObj.password,userOfDB.password)
            //if passwords not matched
            if(status==false){
                response.send({message:"Invalid Password"})
            }
            //if passwords matched
            else{
                //console.log(userOfDB)
                //create token
                let token=jwt.sign({username:userOfDB.username},process.env.SECRET_KEY,{expiresIn:60})
                //send token
                response.send({message:"Login Success",payload:token,userObj:userOfDB})
            }
        }
        else{
            response.send({message:"Wrong UserType"});
        }
        
    }
}))

//create route to handle '/create-user' path
userApp.post('/create-user',upload.single("photo"),expressAsyncHandler(async (request,response)=>{
    //get link from cloudinary
    //console.log(request.file.path)
    //get userCollectionObject
    let userCollectionObject=request.app.get("userCollectionObject");
    //get userObj as string from client and convert into object
    let newUserObj = JSON.parse(request.body.userObj);
    //search for user by username
    let userOfDB=await userCollectionObject.findOne({username:newUserObj.username});
    //if user existed
    if(userOfDB!==null){
        response.send({message:"Username already taken... Try other name!"})
    }
    else{
        //hash password
        let hashedPassword=await bcryptjs.hash(newUserObj.password,10)
        //replace plain password with hashed password in newUserObj
        newUserObj.password=hashedPassword;
        //add profile image link to newUserObj
        newUserObj.profileImg=request.file.path
        //remove photo property
        delete newUserObj.photo
        //add usertype
        newUserObj.usertype="user";
        //insert new user obj
        await userCollectionObject.insertOne(newUserObj)
        //send response
        response.send({message:"New user craeted successfully!"})
    }
}))


//create route to handle '/update-user' path
userApp.put('/update-user',expressAsyncHandler(async (request,response)=>{
    //get userCollectionObject from app.js
    let userCollectionObject=request.app.get("userCollectionObject");
    //get modified user Obj from request
    let modifiedUser=request.body;
    //update the user
    await userCollectionObject.updateOne({username:modifiedUser.username},{$set:{...modifiedUser}})
    //send response
    response.send({message:"User details Modified",payload:modifiedUser})
    
}))


//create route to handle '/remove-user/id' path
userApp.delete('/remove-user/:username',expressAsyncHandler(async (request,response)=>{

    //get userCollectionObject from app.js
    let userCollectionObject=request.app.get("userCollectionObject");
    //get username from url param
    let un=request.params.username
    //delete the user
    await userCollectionObject.deleteOne({username:un})
    //send response
    response.send({message:"User deleted"})
}))

module.exports=userApp;