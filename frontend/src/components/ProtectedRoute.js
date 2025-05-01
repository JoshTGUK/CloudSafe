import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    // Function to check if token is expired
    const isTokenExpired = (token) => {
        if (!token) return true;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch (error) {
            return true;
        }
    };

    if (!token || isTokenExpired(token)) {
        // Clear localStorage
        localStorage.clear();
        
        // Show message to user
        toast.error('Your session has expired. Please log in again.');
        
        // Redirect to login
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute; 