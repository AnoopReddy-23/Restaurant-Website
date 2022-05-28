import React from 'react'
import { Nav } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import './Userdashboard.css'

function Userdashboard() {
  return (
    <>
    <Nav className="justify-content-center mt-3 userdashboard" defaultActiveKey="/profile">
      <Nav.Item>
        <Nav.Link to="profile" as={NavLink}>User Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
          <Nav.Link to="cart" as={NavLink}>Cart</Nav.Link>
      </Nav.Item>
      <Nav.Item>
          <Nav.Link to="products" as={NavLink}>Products</Nav.Link>
      </Nav.Item>
      </Nav>
      {/* outlet */}
      <div className="mt-3">
        <Outlet />
      </div>
  </>
  )
}

export default Userdashboard