import React from 'react'
import { Nav } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";

function Admindashboard() {
  return (
    <>
        <Nav className="justify-content-center mt-3" defaultActiveKey="/profile">
          <Nav.Item>
            <Nav.Link to="profile" as={NavLink}>Admin Profile</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link to="addproduct" as={NavLink}>Add Product</Nav.Link>
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

export default Admindashboard