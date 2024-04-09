import { useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom'

export default function Logout() {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  }, [logout]);
  
  return null
}