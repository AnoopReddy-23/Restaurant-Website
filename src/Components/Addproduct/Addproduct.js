import React from 'react'
import {useForm} from 'react-hook-form'
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useState,useEffect} from 'react'
import addProduct from '../../images/addproduct.svg'
import {MdAddTask} from 'react-icons/md'


function Addproduct() {

  //state from store
  let {userObj,isuserSuccess}=useSelector(state=>state.user)

  const {register, handleSubmit,formState:{errors}}=useForm();
  const navigate=useNavigate();

  //state for image
  let [img,setImg]=useState(null)

  //on image select
  const onImageSelect=(event)=>{
    setImg(event.target.files[0]);
  }

  //submit form
  const onFormSubmit=(productObj)=>{
    //console.log(productObj)
    //create Formdata object
    let formData=new FormData()
    //append values to it
    formData.append("productObj", JSON.stringify(productObj))
    formData.append("foodphoto", img)
    //http post req
    axios.post('http://localhost:4000/product-api/create-product',formData)
    .then(response=>{
      //console.log(response)
      alert(response.data.message)
      //if user create
      if(response.data.message==="New Product created Successfully!"){
        //navigate to login page
        navigate('/products')
      }
    })
    .catch(error=>{
      console.log(error)
      alert("Something went wrong....")
    })
  }

  useEffect(()=>{
    if(isuserSuccess===false){
      navigate('/login')
    }
  },[])

  return (
    <>
    {isuserSuccess===false 
      ? (
            alert("Please Login!!! After then you can see your profile.")
      ) 
      : (<>
        <h1 className='text-warning text-center'>Add Product</h1>
        <img src={addProduct} alt="signup image" width="300px" className='mx-auto d-none d-sm-block border border-2 border-light p-3 m-3'/>
        <div className="row">
          <div className="col-10 col-sm-8 col-md-6 mx-auto">
            <Form onSubmit={handleSubmit(onFormSubmit)}>
  
            {/* FoodItem */}
            <Form.Group className="mb-3">
              <Form.Label>FoodItem </Form.Label>
              <Form.Control type="text" placeholder="Enter FoodItem" {...register("food",{required:true})} />
              {/* validation error message for fooditem */}
              {errors.food && <p className='text-danger'>*Username is required</p>}
            </Form.Group>
            
            {/* Cost */}
            <Form.Group className="mb-3">
              <Form.Label>Cost </Form.Label>
              <Form.Control type="number" placeholder="Enter Cost" {...register("cost",{required:true})} />
              {/* validation error message for cost */}
              {errors.cost && <p className='text-danger'>*Cost is required</p>}
            </Form.Group>
            
            {/* FoodItem Type */}
            <Form.Group className="mb-3">
                <Form.Label>Select type of Food</Form.Label> <br />
                  {/* Starters */}
                  <Form.Check inline type="radio" id="starters">
                    <Form.Check.Input type="radio" value="starters" {...register("foodType", { required: true })} />
                  <Form.Check.Label>Starters</Form.Check.Label>
                </Form.Check>
                {/* Rice and Biryani */}
                <Form.Check inline type="radio" id="riceAndBiryani">
                  <Form.Check.Input type="radio" value="riceAndBiryani" {...register("foodType", { required: true })}/>
                  <Form.Check.Label>Rice and Biryani</Form.Check.Label>
                </Form.Check>
                {/* Snacks*/}
                <Form.Check inline type="radio" id="snacks">
                  <Form.Check.Input type="radio" value="snacks" {...register("foodType", { required: true })}/>
                  <Form.Check.Label>Snacks</Form.Check.Label>
                </Form.Check>
                {/* Drinks*/}
                <Form.Check inline type="radio" id="drinks">
                  <Form.Check.Input type="radio" value="drinks" {...register("foodType", { required: true })}/>
                  <Form.Check.Label>Drinks</Form.Check.Label>
                </Form.Check>
                {/* Deserts */}
                <Form.Check inline type="radio" id="desert">
                  <Form.Check.Input type="radio" value="desert" {...register("foodType", { required: true })}/>
                  <Form.Check.Label>Deserts</Form.Check.Label>
                </Form.Check>
              </Form.Group>
            
            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" {...register("description",{required:true})}/>
              {/* validation error message for description */}
              {errors.description && <p className='text-danger'>*Description is required</p>}
            </Form.Group>
  
            {/* FoodItem image */}
            <Form.Group className="mb-3">
              <Form.Label>FoodItem Image</Form.Label>
              <Form.Control 
                type="file" 
                {...register("foodphoto",{required:true})} 
                onChange={(event)=>onImageSelect(event)}
              />
              {/* validation error message for photo */}
              {errors.foodphoto && <p className='text-danger'>*FoodItem Image is required</p>}
            </Form.Group>
  
            {/* submit button */}
            <Button variant="primary" type="submit">
              ADD ITEM <MdAddTask/>
            </Button>
          </Form>
          </div>
        </div>
        
      </>)
    }
  </>
    
  )
}

export default Addproduct