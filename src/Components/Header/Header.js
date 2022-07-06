import React,{useEffect} from 'react'
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap'
import {Route, Routes, NavLink} from 'react-router-dom'
import Home from '../Home/Home'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Contactus from '../Contactus/Contactus'
import LoginSignup from '../LoginSignup/LoginSignup'
import './Hearder.css'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {clearLoginStatus} from '../../Slices/userSlics'
import {clearProductsData} from '../../Slices/productSlice'
import {clearCartItems} from '../../Slices/cartSlice'
import Userprofile from '../Userprofile/Userprofile'
import Cart from '../Cart/Cart'
import Products from '../Viewproducts/Viewproducts'
import Addproduct from '../Addproduct/Addproduct'
import Gallery from '../Gallery/Gallery'
import logo from '../../images/logo2.jpg'
import {BiLogOutCircle} from 'react-icons/bi'
import {AiFillHome} from 'react-icons/ai'
import {FcGallery,FcAbout,FcReadingEbook} from 'react-icons/fc'
import {MdSwitchAccount} from 'react-icons/md'
import {FaCartArrowDown} from 'react-icons/fa'
import {MdOutlineMenuBook,MdAddchart} from 'react-icons/md'
import PageNotFound from '../PageNotFound/PageNotFound'


function Header() {

  //get state from store
  let {userObj,isuserError,isuserLoading,isuserSuccess,errMsg}=useSelector(
    (state)=>state.user
  )

  //cartproducts from store  
  let {cartItems}=useSelector(state=>state.cart)

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
      <Navbar collapseOnSelect bg="dark" expand="md" variant='dark' sticky='top'>
          <Container>
            <Navbar.Brand href='#' className='me-auto'><img src={logo} alt="Logo" className='logo '/> TastyNest</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
              {isuserSuccess !== true ? (
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
                      <FcAbout/> ContactUs
                    </Nav.Link>
                  </Nav.Item>
                </>
              ) : ( 
                <>
                  {/* This dropdown is visible only when a user is logged in */}  
                  <Nav.Item>
                      <Nav.Link eventKey={5} to="/products" as={NavLink}>
                        Menu <span className='text-success'>
                        <MdOutlineMenuBook size={30}/></span>
                      </Nav.Link>
                  </Nav.Item>
                  {userObj.usertype==="user" ? 
                  (
                    <>
                      <Nav.Item>
                        <Nav.Link eventKey={6} to="/cart" as={NavLink}>
                          Cart <span className='text-warning'>
                          <FaCartArrowDown size={30}/>{cartItems.length}</span>
                        </Nav.Link>
                      </Nav.Item>

                    </>
                  ) : (
                  <Nav.Item>
                      <Nav.Link eventKey={7} to="/addproduct" as={NavLink}>
                        <MdAddchart className='text-primary'/> Add Product
                      </Nav.Link>
                  </Nav.Item>
                  
                  )}
                  
                  <NavDropdown title={"Hello!! "+userObj.username}  id="collasible-nav-dropdown">
                    <NavDropdown.Item>
                      <Nav.Item>
                        <Nav.Link eventKey={8} as={NavLink} to="/profile" className='text-dark'>
                        <FcReadingEbook  size={20}/> Profile 
                        </Nav.Link>
                      </Nav.Item>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={1} as={NavLink} to="/" className='text-dark'>
                            <AiFillHome fill='orange'/> Home
                          </Nav.Link>
                       </Nav.Item>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={3} as={NavLink} to="/gallery" className='text-dark'>
                            <FcGallery/> Gallery
                          </Nav.Link>
                        </Nav.Item>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item>
                        <Nav.Item>
                          <Nav.Link eventKey={4} as={NavLink} to="/contactus" className='text-dark'>
                            <FcAbout/> ContactUs
                          </Nav.Link>
                      </Nav.Item>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />

                    <NavDropdown.Item onClick={userLogout}>
                      <BiLogOutCircle color='red'/> Logout
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
            <Route path='' element={<Login />}/>
            {/* Navigating to cart when child path is empty */}
            {/* <Route path="" element={<Navigate to="login" replace={true} />} /> */}
        </Route>
        <Route path='/gallery' element={<Gallery />}/>
        <Route path='/contactus' element={<Contactus />}/>
        <Route path="profile" element={<Userprofile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/addproduct" element={<Addproduct />} />
        <Route path="/*" element={<PageNotFound />}/>
      </Routes>

    </>
  )
}

export default Header