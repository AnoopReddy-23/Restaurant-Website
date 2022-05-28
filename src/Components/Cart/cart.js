import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios'
import Card from '../Card/Cards'

function Cart() {

    let [products,setProducts]=useState([])
    
    useEffect(()=>{
      const fetchProducts=async ()=>{
        let response=await axios.get('/cart-api/getcartitems')
        let productList=response.data.payload
        setProducts(productList)
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