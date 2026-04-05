import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRole, children }) => {
  const { isSuccess, userObj } = useSelector((state) => state.user);

  // If user is not logged in, redirect to login
  if (!isSuccess) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and user doesn't have it, redirect to home or their own dashboard
  if (allowedRole && userObj?.usertype !== allowedRole) {
    if (userObj?.usertype === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    }
    if (userObj?.usertype === 'user') {
      return <Navigate to="/user-dashboard/profile" replace />;
    }
    return <Navigate to="/" replace />;
  }

  // Return children if provided, otherwise render Outlet for nested routes
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
