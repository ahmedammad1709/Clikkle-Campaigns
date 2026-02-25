import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCookie } from '../utilities/cookies';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  
  const isAuthenticated = () => {
    const user = localStorage.getItem('user');
    const userId = getCookie('userId');
    const accessToken = getCookie('accessToken');
    
    return user && (userId || accessToken);
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;