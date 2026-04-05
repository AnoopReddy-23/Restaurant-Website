import React,{useEffect} from 'react'
import { Nav,Navbar,Container } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { Outlet, NavLink , useNavigate} from "react-router-dom";
import {MdOutlineMenuBook,MdAddchart} from 'react-icons/md'
import {FaConciergeBell} from 'react-icons/fa'



import { toast } from 'react-hot-toast'

function Admindashboard() {

  //get state from store
  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(state=>state.user)
  //console.log(userObj)

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

export default Admindashboard