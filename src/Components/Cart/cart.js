import React, {useState,useEffect} from 'react'
import axios from 'axios' 
import CartCard from '../CartCard/CartCard'
import {Button} from 'react-bootstrap'
import { useSelector,useDispatch } from 'react-redux'
import {CartItems} from '../../Slices/cartSlice'
import { useNavigate } from 'react-router-dom';
import './Cart.css'

import { toast } from 'react-hot-toast'

function Cart() {
    let [products,setProducts]=useState([])
    let [price,setPrice]=useState(0)

    let {userObj,isSuccess: isuserSuccess}=useSelector(state=>state.user)
    let {cartItems,isError,isSuccess,errMsg}=useSelector(state=>state.cart)

    let dispatch=useDispatch()
    let navigate=useNavigate()
    
    useEffect(()=>{
        if(userObj.username) {
            dispatch(CartItems(userObj.username))
        }
    },[])

    useEffect(()=>{
      if(isError){
        console.error(errMsg)
      }
      if(isSuccess){
        let newArray= cartItems.filter((item=> item.username===userObj.username))
        setProducts(newArray)
      }
    }, [isSuccess, isError, cartItems]);

    const handlePrice=()=>{
      let ans=0;
      products.forEach((item)=>(ans+=item.count*(+item.cost)))
      setPrice(ans)
    }

    const handleChange=async (item,d)=>{
      let quantity = item.count + d;
      
      if(quantity === 0) {
          handleRemove(item._id);
          return;
      }
      
      if(quantity < 0) return;

      const obj = { ...item, count: quantity };
      
      try {
          await axios.put('/cart-api/update-cartitem', obj)
          dispatch(CartItems(userObj.username))
      } catch(err) {
          toast.error("Failed to update cart")
      }
    }

    const handleRemove=async (id)=>{
      try {
          await axios.delete(`/cart-api/remove-cartitem/${id}`)
          dispatch(CartItems(userObj.username))
          toast.success("Item removed from cart")
      } catch(err) {
          toast.error("Failed to remove item")
      }
    }

    useEffect(()=> {
      handlePrice()
    }, [products])

    useEffect(()=>{
      if(isuserSuccess===false){
        navigate('/login')
      }
    },[isuserSuccess])

    const handleCheckout = () => {
        toast.success("Proceeding to secure checkout...", {
            icon: '💳',
            duration: 3000
        });
    }

  return (
    <div className='cart-container container'>
     {isuserSuccess===true && (
        <div className="row g-5">
            <div className="col-lg-8">
                <h2 className="section-title text-start">Your Selection</h2>
                <div className="cart-items-section">
                    {products.length > 0 ? (
                        products.map((item)=><CartCard key={item._id} item={item} handleChange={handleChange} handleRemove={handleRemove}/>)
                    ) : (
                        <div className="empty-cart animate__animated animate__fadeIn">
                            <h2>Your cart is currently empty</h2>
                            <Button className="btn-premium" onClick={() => navigate('/products')}>Browse Menu</Button>
                        </div>
                    )}
                </div>
            </div>

            {products.length > 0 && (
                <div className="col-lg-4">
                    <div className="cart-summary animate__animated animate__fadeInRight">
                        <h3 className="summary-title">Order Summary</h3>
                        <div className="summary-item">
                            <span>Subtotal</span>
                            <span>Rs. {price}</span>
                        </div>
                        <div className="summary-item">
                            <span>Delivery Fee</span>
                            <span className="text-success">FREE</span>
                        </div>
                        <div className="summary-item">
                            <span>Service Charge</span>
                            <span>Rs. 50</span>
                        </div>
                        
                        <div className="total-price-row">
                            <span>Total</span>
                            <span className="text-gold">Rs. {price + 50}</span>
                        </div>
                        
                        <Button className="btn-premium w-100 mt-4 py-3" onClick={handleCheckout}>
                            Checkout Now
                        </Button>
                        
                        <p className="text-center text-muted small mt-3">
                            Secure payment powered by TastyNest Pay
                        </p>
                    </div>
                </div>
            )}
        </div>
      )}
    </div>
  )
}

export default Cart