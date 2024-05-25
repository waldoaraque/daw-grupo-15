import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function ProtectedRoute() {
    const { user, logOut } = useAuth()

    return user ? <Outlet /> : logOut()
};

