
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const tokenObj = JSON.parse(sessionStorage.getItem('verifyLoginOtpObject'));
  const token=tokenObj?.token
  // console.log('token is protect',token)

  if (!token ) {
    return <Navigate to="/login" />;
  }
  else if (!token) {
    return <Navigate to="/" />
     }

  return element;
};


export default ProtectedRoute;
