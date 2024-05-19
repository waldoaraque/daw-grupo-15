import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function ProtectedRoute() {
    const { user } = useAuth()

    return user ? <Outlet /> : <Navigate to="/login" />
};

