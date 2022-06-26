import React from 'react'
import {useForm} from 'react-hook-form'
import {Form, Button,Card} from 'react-bootstrap'
import {GoSignIn} from 'react-icons/go'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'


function Signup() {

  const {register,handleSubmit,formState:{errors}}=useForm();
  const navigate=useNavigate()

  //state for image
  let [img,setImg]=useState(null)

  //on image select
  const onImageSelect=(event)=>{
    setImg(event.target.files[0]);
  }

  //submit form
  const onFormSubmit=(userObj)=>{
    //console.log(userObj)
    //create Formdata object
    let formData=new FormData()
    //append values to it
    formData.append("userObj", JSON.stringify(userObj))
    formData.append("photo", img)

    //HTTP POST request
    axios.post('http://localhost:4000/user-api/create-user', formData)
    .then(response=>{
      //console.log(response)
      alert(response.data.message)
      //if user created
      if(response.data.message==="New user craeted successfully!"){
        //navigate to login
        navigate('/login')

      }
    })
    .catch(error=>{
      console.log(error)
      alert("Something went wrong!! Please try again after sometime..")
    })
  }

  return (
    <>
      <div className="col-10 col-sm-8 col-md-7 mx-auto border border-2">
        {/* form */}
        <Form onSubmit={handleSubmit(onFormSubmit)} className='p-5'>
          {/* username */}
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" {...register('username',{required:true})} />
             {/* validation error message for username */}
             {errors.username && <p className='text-danger'>*Username is required</p>}
          </Form.Group>
          {/* password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" {...register('password',{required:true})}/>
             {/* validation error message for password */}
             {errors.password && <p className='text-danger'>*password is required</p>}
          </Form.Group>
          {/* email */}
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" {...register('email',{required:true})} />
             {/* validation error message for city */}
             {errors.email && <p className='text-danger'>*Email is required</p>}
          </Form.Group>
           {/* city */}
           <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="Enter City" {...register('city',{required:true})} />
             {/* validation error message for city */}
             {errors.city && <p className='text-danger'>*City is required</p>}
          </Form.Group>
          

          {/* Profile image */}
          <Form.Group className="mb-3">
            <Form.Label>Select Profile Pic</Form.Label>
            <Form.Control 
              type="file" 
              {...register("photo",{required:true})} 
              onChange={(event)=>onImageSelect(event)}
            />
            {/* validation error message for photo */}
            {errors.photo && <p className='text-danger'>*Profile pic is required</p>}
          </Form.Group>

          {/* Button */}
          <Button variant="primary" type="submit">
            Submit <GoSignIn />
          </Button>
        </Form>

        </div>
    </>
  )
}

export default Signup