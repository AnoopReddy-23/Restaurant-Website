import React from 'react'
import { useEffect } from 'react';
import { Nav,Navbar,Container } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import './Userdashboard.css'
import {FaCartArrowDown} from 'react-icons/fa'
import {MdOutlineMenuBook} from 'react-icons/md'

function Userdashboard() {

  //get state from store
  let {userObj,isSuccess}=useSelector(state=>state.user)
  //console.log(userObj)
  //cartproducts from store  
  let {cartItems}=useSelector(state=>state.cart)

  let navigate=useNavigate()

  useEffect(()=>{
    if(isSuccess===false){
      navigate('/login')
    }
  },[])

  return (
   <>
    {isSuccess===false 
      ? (
            alert("Please Login!!! After then u can use the dashboard")
      ) 
      : ( 
      <>  
        <Navbar collapseOnSelect bg="dark" expand="sm" variant='dark' className='mt-3'>
            <Container>
              <Navbar.Brand href='#'>UserDashBoard</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto" defaultActiveKey="/products">
                  <Nav.Item>
                      <Nav.Link to="cart" as={NavLink}>Cart <span className='text-warning'><FaCartArrowDown size={30}/>{cartItems.length}</span></Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link to="products" as={NavLink}>Menu <span className='text-muted'><MdOutlineMenuBook size={30}/></span></Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>

            {/* outlet */}
            <div className="mt-3">
              <Outlet />
            </div>
        </>)
    }
   </>
  )
}

export default Userdashboard