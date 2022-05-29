import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import CartCard from '../CartCard/CartCard'
import { useSelector } from 'react-redux'

function Cart() {

    let [products,setProducts]=useState([])

    //state from store
    let {userObj}=useSelector(state=>state.user)
    
    useEffect(()=>{
      const fetchProducts=async ()=>{
        //http get req
        let response=await axios.get('/cart-api/getcartitems')
        let productList=response.data.payload
        //getting the cart products only that belongs to the user logged in
        let newArray= productList.filter((item=> item.username===userObj.username))
        setProducts(newArray)
        //console.log(productList)
        //console.log(newArray)
      }
      fetchProducts()
    },[])


    const handleChange=(item,d)=>{
      const ind=products.indexOf(item)
      const arr=products
      arr[ind].count +=d;

      if(arr[ind].count==0){
        //delete req
        axios.delete('/cart-api/remove-product/item.food')
        .then(response=>alert(response.data.message))
        .catch(error=>alert(error))
        setProducts([...arr])
      }
    }

    const handleRemove=(id)=>{
      let response=axios.delete(`http://localhost:4000/cart-api/remove-cartitem/${id}`)
      alert(response.data.message)
      const arr=products.filter((item)=>item._id!=id)
      setProducts(arr)
    }

  return (
    <div>
      
      <div className='mt-5 row'>
        {
          products.map((item)=><CartCard key={item._id} item={item} handleChange={handleChange} handleRemove={handleRemove}/>
        )}
      </div>

    </div>
  )
}

export default Cart