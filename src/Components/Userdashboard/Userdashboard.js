import React from 'react'
import { useEffect } from 'react';
import { Nav,Navbar,Container } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import './Userdashboard.css'
import {FaCartArrowDown, FaClock} from 'react-icons/fa'
import {MdOutlineMenuBook} from 'react-icons/md'

import { toast } from 'react-hot-toast'

function Userdashboard() {

  //get state from store
  let {userObj,isSuccess}=useSelector(state=>state.user)
  //console.log(userObj)
  //cartproducts from store  
  let {cartItems}=useSelector(state=>state.cart)

  let navigate=useNavigate()

  useEffect(()=>{
    if(isSuccess===false){
      toast.error("Please Login to access the dashboard")
      navigate('/login')
    }
  },[isSuccess, navigate])

  return (
   <>
    {isSuccess===true && (
      <div className="dashboard-content animate__animated animate__fadeIn">
          {/* outlet */}
          <div className="mt-3">
            <Outlet />
          </div>
      </div>
    )}
   </>
  )
}

export default Userdashboard