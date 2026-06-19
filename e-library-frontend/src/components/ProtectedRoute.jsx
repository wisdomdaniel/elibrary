import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Pages/context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        // Not logged in, redirect to login page
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Logged in but doesn't have the right role
        // Redirect to a default page based on their actual role
        return user.role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/student" replace />;
    }

    return children;
};

export default ProtectedRoute;
