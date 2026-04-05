import React, { useEffect } from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Route, Routes, NavLink } from 'react-router-dom'
import Home from '../Home/Home'
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import Contactus from '../Contactus/Contactus'
import LoginSignup from '../LoginSignup/LoginSignup'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { clearLoginStatus } from '../../Slices/userSlice'
import { clearProductsData } from '../../Slices/productSlice'
import { clearCartItems } from '../../Slices/cartSlice'
import Userprofile from '../Userprofile/Userprofile'
import Cart from '../Cart/Cart'
import Products from '../Viewproducts/Viewproducts'
import Addproduct from '../Addproduct/Addproduct'
import Gallery from '../Gallery/Gallery'
import logo from '../../images/logo2.jpg'
import { BiLogOutCircle } from 'react-icons/bi'
import { AiFillHome } from 'react-icons/ai'
import { FcGallery, FcAbout, FcReadingEbook } from 'react-icons/fc'
import { MdSwitchAccount, MdOutlineMenuBook, MdAddchart } from 'react-icons/md'
import { FaCartArrowDown, FaClock, FaConciergeBell } from 'react-icons/fa'

function Header() {
  //get state from store
  let { userObj, isSuccess } = useSelector((state) => state.user)

  //cartproducts from store
  let { cartItems } = useSelector((state) => state.cart)

  //get dispath function
  let dispatch = useDispatch()

  //get navigate function
  let navigate = useNavigate()

  //logout user
  const userLogout = () => {
    localStorage.clear()
    dispatch(clearLoginStatus())
    dispatch(clearProductsData())
    dispatch(clearCartItems())
    navigate('/login')
  }

  return (
    <>
      <Navbar
        collapseOnSelect
        bg="dark"
        expand="md"
        variant="dark"
        sticky="top"
      >
        <Container>
          <Navbar.Brand
            href="#"
            className="me-auto"
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="Logo" className="logo " /> TastyNest
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {isSuccess !== true ? (
                <>
                  <Nav.Item>
                    <Nav.Link eventKey={1} as={NavLink} to="/">
                      <AiFillHome fill="orange" /> Home
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey={2} as={NavLink} to="/login">
                      <MdSwitchAccount color="blue" /> Login
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey={3} as={NavLink} to="/gallery">
                      <FcGallery /> Gallery
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link eventKey={4} as={NavLink} to="/contactus">
                      <FcAbout /> Contact
                    </Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <Nav.Item>
                    <Nav.Link eventKey={5} to="/products" as={NavLink}>
                      Menu{' '}
                      <MdOutlineMenuBook size={22} className="text-gold ms-1" />
                    </Nav.Link>
                  </Nav.Item>

                  {userObj.usertype === 'user' ? (
                    <>
                      <Nav.Item>
                        <Nav.Link
                          eventKey={6}
                          to="/user-dashboard/orders"
                          as={NavLink}
                        >
                          Orders{' '}
                          <FaClock size={20} className="text-gold ms-1" />
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey={7}
                          to="/user-dashboard/cart"
                          as={NavLink}
                        >
                          Cart{' '}
                          <FaCartArrowDown
                            size={22}
                            className="text-gold ms-1"
                          />
                          {cartItems.length > 0 && (
                            <span className="cart-count">
                              {cartItems.length}
                            </span>
                          )}
                        </Nav.Link>
                      </Nav.Item>
                    </>
                  ) : (
                    <>
                      <Nav.Item>
                        <Nav.Link
                          eventKey={8}
                          to="/admin-dashboard/orders"
                          as={NavLink}
                        >
                          Live Orders{' '}
                          <FaConciergeBell
                            size={20}
                            className="text-gold ms-1"
                          />
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey={9}
                          to="/admin-dashboard/addproduct"
                          as={NavLink}
                        >
                          Add Dish{' '}
                          <MdAddchart size={22} className="text-gold ms-1" />
                        </Nav.Link>
                      </Nav.Item>
                    </>
                  )}

                  <NavDropdown
                    title={'Hi, ' + userObj.username}
                    id="collasible-nav-dropdown"
                    align="end"
                  >
                    <NavDropdown.Item
                      as={NavLink}
                      to={
                        userObj.usertype === 'admin'
                          ? '/admin-dashboard'
                          : '/user-dashboard/profile'
                      }
                    >
                      <FcReadingEbook size={18} className="me-2" /> Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={NavLink} to="/gallery">
                      <FcGallery size={18} className="me-2" /> Gallery
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/contactus">
                      <FcAbout size={18} className="me-2" /> Help & Contact
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={userLogout}
                      className="text-danger"
                    >
                      <BiLogOutCircle size={18} className="me-2" /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
