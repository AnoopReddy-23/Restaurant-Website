import React from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import {Route, Routes, NavLink} from 'react-router-dom'
import Home from '../Home/Home'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Contactus from '../Contactus/Contactus'
import LoginSignup from '../LoginSignup/LoginSignup'
import './Hearder.css'
import Userdashboard from '../Userdashboard/Userdashboard'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate,Navigate} from 'react-router-dom'
import {clearLoginStatus} from '../../Slices/userSlics'
import {clearProductsData} from '../../Slices/productSlice'
import {clearCartItems} from '../../Slices/cartSlice'
import Userprofile from '../Userprofile/Userprofile'
import Cart from '../Cart/Cart'
import Products from '../Viewproducts/Viewproducts'
import Admindashboard from '.././Admindashboard/Admindashboard'
import Addproduct from '../Addproduct/Addproduct'
import Orders from '../Orders/Orders'
import Gallery from '../Gallery/Gallery'
import logo from '../../images/logo2.jpg'
import {RiAccountCircleFill} from 'react-icons/ri'
import {AiFillHome} from 'react-icons/ai'
import {FcGallery,FcAbout} from 'react-icons/fc'
import {MdSwitchAccount} from 'react-icons/md'


function Header() {

  //get state from store
  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(
    (state)=>state.user
  )

  //get dispath function
  let dispath=useDispatch()

  //get navigate function
  let navigate=useNavigate()

  //logout user
  const  userLogout=()=>{
    localStorage.clear();
    dispath(clearLoginStatus());
    dispath(clearProductsData());
    dispath(clearCartItems());
    navigate("/login");
  }

  return (
    <>
      <Navbar collapseOnSelect bg="dark" expand="md" variant='dark'>
          <Container>
            <Navbar.Brand href='#' className='me-auto'><img src={logo} alt="Logo" className='logo '/> Restaurant</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
              {isSuccess !== true ? (
                <>
                  {/* These links can be visible when no user logged in */}
                  <Nav.Item>
                    <Nav.Link eventKey={1} as={NavLink} to="/">
                      <AiFillHome fill='orange'/> Home
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey={2} as={NavLink} to="/login">
                      <MdSwitchAccount color='blue'/> Login/Signup
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey={3} as={NavLink} to="/gallery">
                     <FcGallery/> Gallery
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey={4} as={NavLink} to="/contactus">
                      <FcAbout/> AboutUs
                    </Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  {/* This dropdown is visible only when a user is logged in */}
                  <NavDropdown title={userObj.username} id="collasible-nav-dropdown">
                    <NavDropdown.Item>
                      <Nav.Item>
                        <Nav.Link  as={NavLink} to="/profile" className='text-dark'>
                          Profile <span className='text-dark'><RiAccountCircleFill size={20}/></span>
                        </Nav.Link>
                      </Nav.Item>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>Change password</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={userLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      {/* Routes */}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<LoginSignup />} >
            <Route path='signup' element={<Signup />}/>
            <Route path='login' element={<Login />}/>
            {/* Navigating to cart when child path is empty */}
            <Route path="" element={<Navigate to="login" replace={true} />} />
        </Route>
        <Route path='/gallery' element={<Gallery />}/>
        <Route path='/contactus' element={<Contactus />}/>
        <Route path="profile" element={<Userprofile />} />
        <Route path='/userdashboard' element={<Userdashboard />} >
            <Route path="cart" element={<Cart />} />
            <Route path="products" element={<Products />} />
            {/* Navigating to cart when child path is empty */}
            <Route path="" element={<Navigate to="products" replace={true} />} />
        </Route>
        <Route path="/admindashboard" element={<Admindashboard />} >
            <Route path="addproduct" element={<Addproduct />} />
            <Route path="products" element={<Products />} />
            {/* Navigating to orders when child path is empty */}
            <Route path="" element={<Navigate to="addproduct" replace={true} />} />
          </Route>
      </Routes>

    </>
  )
}

export default Header