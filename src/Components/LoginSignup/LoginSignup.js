import React from 'react'
import {Nav,Card} from 'react-bootstrap'
import { Outlet, NavLink } from "react-router-dom";
import login from '../../images/login.svg'


function LoginSignup() {
  return (
    <div>
        <img src={login} alt="login image" width="300px" className='d-block mx-auto border border-2 border-light p-3 m-3'/>
        <div className="col-10 col-sm-8 col-md-7 mx-auto border border-2">
            <Card.Header>
                <Nav className="justify-content-evenly">
                    <Nav.Item>
                        <Nav.Link  as={NavLink} to="signup">
                            Signup
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link as={NavLink} to="">
                            Login
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
        </div>
         {/* outlet */}
        <div>
          <Outlet />
        </div>
    </div>
  )
}

export default LoginSignup