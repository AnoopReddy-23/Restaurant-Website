import React from 'react'
import { Outlet } from "react-router-dom";

function LoginSignup() {
  return (
    <div className="auth-wrapper">
        <Outlet />
    </div>
  )
}

export default LoginSignup