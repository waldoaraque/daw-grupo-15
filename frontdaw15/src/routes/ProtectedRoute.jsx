import * as Outlet from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider';

export default function ProtectedRoute() {
    const auth = useAuth();

    return auth.isAuthenticated ? <Oulet /> : <Navigate to="/" />;
}

