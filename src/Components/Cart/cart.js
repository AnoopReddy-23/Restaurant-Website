import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Card from '../Card/Cards'
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


  return (
    <div>
      
      <div className='mt-5 row'>
        {
          products.map((item)=><Card key={item._id} item={item} />
        )}
      </div>

    </div>
  )
}

export default Cart