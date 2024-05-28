import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function ProtectedRoute() {
    const { user, token } = useAuth()

    return user && token ? <Outlet /> : <Navigate to="/login" />
}
