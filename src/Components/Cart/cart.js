import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios' 
import CartCard from '../CartCard/CartCard'
import {Button} from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import {CartItems} from '../../Slices/cartSlice'

function Cart() {

    let [products,setProducts]=useState([])
    let [price,setPrice]=useState(0)

    //state from store
    let {userObj}=useSelector(state=>state.user)
    //products from store  
    let {cartItems,isError,isSuccess,errMsg}=useSelector(state=>state.cart)

    //dispatch fun
    let dispatch=useDispatch()
    
    useEffect(()=>{
      dispatch(CartItems(userObj.username))
    },[])


    //this to be executed when either isSuccess or isError changed
    useEffect(()=>{
      if(isError){
        alert(errMsg)
      }
      if(isSuccess){
        //getting the cart products only that belongs to the user logged in
        let newArray= cartItems.filter((item=> item.username===userObj.username))
        setProducts(newArray)
      }
    }, [isSuccess, isError]);

    const handlePrice=()=>{
      let ans=0;
      products.map((item)=>(ans+=item.count*(+item.cost)))
      setPrice(ans)
    }

    const handleChange=async (item,d)=>{
      let quantity=0;
      const ind=products.indexOf(item)
      const arr=products
      const obj={
        ...arr[ind]
      };
      quantity+=obj.count;
      quantity+=d;
      obj.count=quantity;
      //http put req (updating the quantity)
      //console.log(item)
      let response=await axios.put('/cart-api/update-cartitem', obj)
      alert(response.data.message)
      //console.log(response)
      arr[ind]=obj
      setProducts([...arr])
      if(arr[ind].count==0){
        //delete req
        handleRemove(item._id)
      }
      handlePrice()
      dispatch(CartItems(userObj.username))
    }

    const handleRemove=(id)=>{
      //delete req
      let response=axios.delete(`http://localhost:4000/cart-api/remove-cartitem/${id}`)
      //console.log(id)
      const arr=products.filter((item)=>item._id!=id)
      setProducts([...arr])
      handlePrice()

      dispatch(CartItems(userObj.username))
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