import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { isAuthenticated, token } = useAuth();
    const location = useLocation();

    // While token is present but user isn't loaded yet, show loading or nothing
    if (token && !isAuthenticated) {
        return <div className="text-center py-20">Loading...</div>; // Or a spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;