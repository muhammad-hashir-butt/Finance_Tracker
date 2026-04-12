import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // Agar user authenticated nahi hai, toh login page par bhej do
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Agar user hai, toh dashboard (children) dikhao
  return children;
};

export default PrivateRoute;
