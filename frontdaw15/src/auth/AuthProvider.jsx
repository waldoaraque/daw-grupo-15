/*

import { useContext, createContext, useState, useEffect } from 'react'

const AuthContext = createContext({
    isAuthenticated: false,
})

export function AuthProvider({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(true  )

    return (
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>

    )
}

export const useAuth = () => useContext(AuthContext);

*/
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  handleAuth: () => Promise.resolve(),
});

export function AuthProvider({ children }) {
  const API_HOST = 'http://localhost';
  const API_PORT = 4000;

  const handleAuth = async (email, contrasena) => {
    try {
      console.log('Usuario:', email, 'Contraseña:', contrasena);
      const res = await fetch(`${API_HOST}:${API_PORT}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, contrasena }),
      });
      if (res.ok) {
        const data = await res.json();
        const accessToken = data.access_token;
        localStorage.setItem('token', accessToken);
        setIsAuthenticated(true);
      } else {
        console.error('Inicio de sesión fallido');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setIsAuthenticated(false);
    }
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Inicializar como falso

  return (
    <AuthContext.Provider value={{ isAuthenticated, handleAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);