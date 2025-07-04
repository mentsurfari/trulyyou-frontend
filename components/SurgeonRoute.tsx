
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SurgeonRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { isAuthenticated, user, token } = useAuth();
    const location = useLocation();

    if (token && !user) {
        return <div className="text-center py-20">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!user?.roles?.includes('surgeon')) {
        return <Navigate to="/profile" replace />;
    }

    return children;
};

export default SurgeonRoute;
