import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    // If token exists, allow access to the nested routes (via <Outlet />)
    // Otherwise, redirect to the login page
    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
