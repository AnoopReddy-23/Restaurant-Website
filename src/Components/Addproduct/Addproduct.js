import React from 'react'
import {useForm} from 'react-hook-form'
import {Form, Button} from 'react-bootstrap'
import axios from '../../utils/axiosInstance'
import {useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import {useState,useEffect} from 'react'
import {MdAddTask, MdRestaurantMenu} from 'react-icons/md'
import {getProducts} from '../../Slices/productSlice'

import { toast } from 'react-hot-toast'

function Addproduct() {
  let {isSuccess}=useSelector(state=>state.user)

  const {register, handleSubmit,formState:{errors}}=useForm();
  const navigate=useNavigate();
  const dispatch=useDispatch();

  let [img,setImg]=useState(null)

  const onImageSelect=(event)=>{
    setImg(event.target.files[0]);
  }

  const onFormSubmit=(productObj)=>{
    let formData=new FormData()
    formData.append("productObj", JSON.stringify(productObj))
    formData.append("foodphoto", img)
    
    axios.post('/product-api/create-product',formData)
    .then(response=>{
      if(response.data.message==="New Product created Successfully!"){
        toast.success(response.data.message)
        dispatch(getProducts());
        navigate('/products');
      } else {
        toast.error(response.data.message)
      }
    })
    .catch(error=>{
      toast.error("Error adding product. Please try again.")
    })
  }

  useEffect(()=>{
    if(isSuccess===false){
      navigate('/login')
    }
  },[isSuccess])

  return (
    <div className='auth-container'>
     {isSuccess===true && (
        <div className="auth-card w-100" style={{ maxWidth: '800px' }}>
          <div className="text-center mb-5">
             <MdRestaurantMenu size={50} className="text-gold mb-3"/>
             <h2 className="auth-title mb-0">Curate Your Menu</h2>
             <p className="text-muted mt-2">Add a new gourmet masterpiece to TastyNest</p>
          </div>
          
          <Form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="row">
                <div className="col-md-6">
                    <Form.Group className="mb-4">
                      <Form.Label>Dish Name</Form.Label>
                      <Form.Control type="text" placeholder="e.g. Truffle Risotto" {...register("food",{required:true})} />
                      {errors.food && <p className='text-danger small mt-1'>* Name is required</p>}
                    </Form.Group>
                </div>
                <div className="col-md-6">
                    <Form.Group className="mb-4">
                      <Form.Label>Price (Rs.)</Form.Label>
                      <Form.Control type="number" placeholder="0.00" {...register("cost",{required:true})} />
                      {errors.cost && <p className='text-danger small mt-1'>* Cost is required</p>}
                    </Form.Group>
                </div>
            </div>
            
            <Form.Group className="mb-4">
                <Form.Label>Course Category</Form.Label>
                <div className="user-type-selector justify-content-start flex-wrap gap-2">
                    {['starters', 'riceAndBiryani', 'snacks', 'drinks', 'desert'].map(type => (
                        <Form.Check key={type} inline type="radio" id={type} className="custom-radio">
                            <Form.Check.Input type="radio" value={type} {...register("foodType", { required: true })} />
                            <Form.Check.Label className="text-muted text-capitalize">{type.replace('And', ' & ')}</Form.Check.Label>
                        </Form.Check>
                    ))}
                </div>
                {errors.foodType && <p className='text-danger small mt-1'>* Category is required</p>}
            </Form.Group>
            
            <div className="row mb-4">
                <div className="col-md-4">
                    <Form.Group>
                        <Form.Label>Dietary Type</Form.Label>
                        <div className="d-flex gap-3 mt-2">
                            <Form.Check type="radio" label="Veg" value="true" {...register("isVeg", { required: true })} className="text-muted" />
                            <Form.Check type="radio" label="Non Veg" value="false" {...register("isVeg", { required: true })} className="text-muted" />
                        </div>
                    </Form.Group>
                </div>
                <div className="col-md-4">
                    <Form.Group>
                        <Form.Label>Highlights</Form.Label>
                        <Form.Check type="checkbox" label="Best Seller" {...register("isBestSeller")} className="text-muted mt-2" />
                    </Form.Group>
                </div>
                <div className="col-md-4">
                    <Form.Group>
                        <Form.Label>Rating (1-5)</Form.Label>
                        <Form.Control type="number" step="0.1" min="1" max="5" defaultValue="4.5" {...register("rating")} />
                    </Form.Group>
                </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Chef's Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Describe the flavors, ingredients and inspiration..." {...register("description",{required:true})}/>
              {errors.description && <p className='text-danger small mt-1'>* Description is required</p>}
            </Form.Group>
  
            <Form.Group className="mb-5">
              <Form.Label>Signature Presentation Image</Form.Label>
              <Form.Control type="file" {...register("foodphoto",{required:true})} onChange={(event)=>onImageSelect(event)} />
              {errors.foodphoto && <p className='text-danger small mt-1'>* Image is required</p>}
            </Form.Group>
  
            <Button className="btn-premium w-100 py-3" type="submit">
              Publish to Menu <MdAddTask className="ms-2"/>
            </Button>
          </Form>
        </div>
      )}
    </div>
  )
}

export default Addproduct