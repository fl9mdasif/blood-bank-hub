import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // We need a library to decode the token

const AdminRoute = () => {
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                // Check if the token has a 'role' property and if it's 'admin'
                if (decodedToken && decodedToken.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            } catch (error) {
                console.error("Invalid token:", error);
                setIsAdmin(false);
            }
        } else {
            setIsAdmin(false);
        }
    }, []);

    if (isAdmin === null) {
        // Show a loading state while we verify the token
        return <div>Loading...</div>;
    }

    // If isAdmin is true, render the nested admin pages.
    // Otherwise, redirect to the home page (or a dedicated 'unauthorized' page).
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
