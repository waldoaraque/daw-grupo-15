import { useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { Navigate } from 'react-router-dom'

export default function Logout() {
  const { logOut } = useAuth()

  useEffect(() => {
    logOut()
  }, [logOut]);
  
  return null
}