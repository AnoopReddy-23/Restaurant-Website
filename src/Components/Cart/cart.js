import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios' 
import CartCard from '../CartCard/CartCard'
import { useSelector } from 'react-redux'
import {Button} from 'react-bootstrap'

function Cart() {

    let [products,setProducts]=useState([])
    let [price,setPrice]=useState(0)

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

    const handlePrice=()=>{
      let ans=0;
      products.map((item)=>(ans+=item.count*(+item.cost)))
      setPrice(ans)
    }

    const handleChange=async (item,d)=>{
      let quantity=0;
      const ind=products.indexOf(item)
      const arr=products
      quantity+=arr[ind].count;
      quantity+=d;
      arr[ind].count=quantity;
      //http put req (updating the quantity)
      //console.log(item)
      let response=await axios.put('/cart-api/update-cartitem', arr[ind])
      alert(response.data.message)
      //console.log(response)
      setProducts([...arr])
      if(arr[ind].count==0){
        //delete req
        handleRemove(item.food)
      }
      handlePrice()
    }

    const handleRemove=(food)=>{
      //delete req
      let response=axios.delete(`http://localhost:4000/cart-api/remove-cartitem/${food}`)
      //console.log(response)
      const arr=products.filter((item)=>item.food!=food)
      setProducts([...arr])
      handlePrice()
    }

    useEffect(()=>
      handlePrice()
    )

  return (
    <div> 
      
      <div className='mt-5 mx-5 row'>
        {
          products.map((item)=><CartCard key={item._id} item={item} handleChange={handleChange} handleRemove={handleRemove}/>
        )}
      </div>
      <div className="row text-center">
        <span>Total Price of Products is </span>
        <span className='text-danger'>Rs.{price}/-</span>
        <Button className="bg-success p-3 mt-3 col-4 mx-auto" onClick={()=>console.log(products,price)}>CheckOut</Button>
      </div>

    </div>
  )
}

export default Cart