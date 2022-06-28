import React,{useEffect} from 'react'
import { Nav,Navbar,Container } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { Outlet, NavLink , useNavigate} from "react-router-dom";
import {MdOutlineMenuBook,MdAddchart} from 'react-icons/md'



function Admindashboard() {

  //get state from store
  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(state=>state.user)
  //console.log(userObj)

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
              <Navbar.Brand href='#'>AdminDashBoard</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto" defaultActiveKey="/addproduct">    
                  <Nav.Item>
                      <Nav.Link to="addproduct" as={NavLink}>
                        <MdAddchart className='text-primary'/> Add Product
                      </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                      <Nav.Link to="products" as={NavLink}>
                        <MdOutlineMenuBook className='text-warning'/> Menu
                      </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
          </Container>
        </Navbar>

            {/* outlet */}
            <div className="mt-3">
              <Outlet />
            </div>
        </> )
    }
   </>
  )
}

export default Admindashboard