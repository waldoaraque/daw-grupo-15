import { useEffect } from 'react'
import { useAuth } from '../auth/AuthProvider'

export default function Logout() {
  const { logOut } = useAuth()

  useEffect(() => {
    logOut()
  }, [logOut])
  
  return null
}