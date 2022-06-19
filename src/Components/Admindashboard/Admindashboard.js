import React,{useEffect} from 'react'
import { Nav } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { Outlet, NavLink , useNavigate} from "react-router-dom";

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
      : ( <>
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
            <Nav.Item>
                <Nav.Link to="orders" as={NavLink}>Orders</Nav.Link>
            </Nav.Item>
            </Nav>
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