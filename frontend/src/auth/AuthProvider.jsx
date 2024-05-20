import React, { createContext, useContext, useState, useEffect } from 'react'
import { loginService } from '../services/login.service'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(window.localStorage.getItem('userSession') || '')
  const [tokenPayload, setTokenPayload] = useState(null)

  useEffect(() => {
    const storedSession = window.localStorage.getItem('userSession')
    if (storedSession) {
      const { username, token } = JSON.parse(storedSession)
      const payloadToken = jwtDecode(token)
      if (username && token && !isTokenExpired(token)) {
          setUser(username)
          setToken(token)
          setTokenPayload(payloadToken)
      } else {
          logOut()
      }

    }
  }, [])

  const loginAction = async (data) => {
    try {
      const authentication = await loginService({ 'email': data.username, 'contrasena': data.password })
      const payloadToken = jwtDecode(authentication.token)
      setUser(authentication.username)
      setToken(authentication.token)
      setTokenPayload(payloadToken)
      window.localStorage.setItem(
        'userSession', JSON.stringify(authentication)
      )
    } catch (error) {
      
    }
  }

  const logOut = () => {
    setUser(null)
    setToken('')
    setTokenPayload('')
    window.localStorage.removeItem('userSession')
  }

  const isTokenExpired = (token) => {
    if (!token) {
        return true
    }

    try {
        const decoded = jwtDecode(token)
        const now = Date.now() / 1000
        return decoded.exp < now
    } catch (error) {
        return true
    }
  }

  return (
    <AuthContext.Provider value={{ token, user, tokenPayload, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)