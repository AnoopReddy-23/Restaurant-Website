import React from 'react'
import {useForm} from 'react-hook-form'
import {Form, Button} from 'react-bootstrap'
import {MdLogin} from 'react-icons/md'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import {userLogin} from '../../Slices/userSlice'
import {CartItems} from '../../Slices/cartSlice'


import '../LoginSignup/Auth.css'

import { toast } from 'react-hot-toast'

function Login() {
  const {register, handleSubmit,formState:{errors}}=useForm();
  let {isError,isSuccess,errMsg}=useSelector(state=>state.user)
  let dispatch=useDispatch()
  let navigate=useNavigate()

  const onFormSubmit=(userCredObj)=>{
      dispatch(userLogin(userCredObj));
  }

  useEffect(()=>{
    if(isError){
      toast.error(errMsg)
    }
    if(isSuccess){
        navigate("/products");
        // dispatch(CartItems(userObj.username));
    }
  }, [isSuccess, isError]);

  return (
    <div className="auth-container">
        <div className="auth-card animate__animated animate__fadeIn">
          <h2 className="auth-title">Welcome Back</h2>
          <Form onSubmit={handleSubmit(onFormSubmit)}>

            <Form.Group className="mb-4">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Your username" {...register("username",{required:true})} />
              {errors.username && <p className='text-danger small mt-1'>* Username is required</p>}
            </Form.Group>

            <Form.Group className="mb-4" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="••••••••" {...register("password",{required:true})} />
              {errors.password && <p className='text-danger small mt-1'>* Password is required</p>}
            </Form.Group>
            
            <Button className="btn-premium w-100" type="submit">
              Sign In <MdLogin className="ms-2"/>
            </Button>

            <p className="auth-toggle">
              Don't have an account? <span onClick={() => navigate('/login/signup')}>Register</span>
            </p>
          </Form>
        </div>
    </div>
  )
}

export default Login
