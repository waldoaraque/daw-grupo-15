import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider';

export default function ProtectedRoute() {
    const navigate = useNavigate()
    const { token } = useAuth();
    // Check if the user is authenticated
    if (!token) {
        // If not authenticated, redirect to the login page
        navigate("/login");
    }
    
    // If authenticated, render the child routes
    return <Outlet />;
};

