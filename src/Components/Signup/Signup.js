import React from 'react'
import {useForm} from 'react-hook-form'
import {Form, Button,Card} from 'react-bootstrap'
import {GoSignIn} from 'react-icons/go'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'


import '../LoginSignup/Auth.css'

import { toast } from 'react-hot-toast'

function Signup() {
  const {register,handleSubmit,formState:{errors}}=useForm();
  const navigate=useNavigate()
  let [img,setImg]=useState(null)

  const onImageSelect=(event)=>{
    setImg(event.target.files[0]);
  }

  const onFormSubmit=(userObj)=>{
    let formData=new FormData()
    formData.append("userObj", JSON.stringify(userObj))
    formData.append("photo", img)

    axios.post('/user-api/create-user', formData)
    .then(response=>{
      if(response.data.message==="New user craeted successfully!"){
        toast.success(response.data.message)
        navigate('/login')
      } else {
        toast.error(response.data.message)
      }
    })
    .catch(error=>{
      console.log(error)
      toast.error("Something went wrong!! Please try again later.")
    })
  }

  return (
    <div className="auth-container">
        <div className="auth-card animate__animated animate__fadeIn">
          <h2 className="auth-title">Create Account</h2>
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Choose a username" {...register('username',{required:true})} />
              {errors.username && <p className='text-danger small mt-1'>* Username is required</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="••••••••" {...register('password',{required:true})}/>
              {errors.password && <p className='text-danger small mt-1'>* Password is required</p>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="email@example.com" {...register('email',{required:true})} />
              {errors.email && <p className='text-danger small mt-1'>* Email is required</p>}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Select Profile Picture</Form.Label>
              <Form.Control type="file" {...register("photo",{required:true})} onChange={(event)=>onImageSelect(event)} />
              {errors.photo && <p className='text-danger small mt-1'>* Profile picture is required</p>}
            </Form.Group>

            <Button className="btn-premium w-100" type="submit">
              Register <GoSignIn className="ms-2"/>
            </Button>

            <p className="auth-toggle">
              Already have an account? <span onClick={() => navigate('/login')}>Sign In</span>
            </p>
          </Form>
        </div>
    </div>
  )
}

export default Signup
