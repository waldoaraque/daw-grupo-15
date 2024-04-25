import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect( () => {
    const loggedUserJSON = window.localStorage.getItem('userSession')
    if (loggedUserJSON) {
        setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('userSession')
    setUser(null);
     // Limpiar el estado del usuario al cerrar sesión
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);