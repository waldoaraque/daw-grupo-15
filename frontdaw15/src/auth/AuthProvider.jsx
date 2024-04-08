
import React, { createContext, useContext, useState, useMemo } from 'react';

//const [isAuthenticated, setIsAuthenticated] = useState(false); // Inicializar como falso

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken_] = useState(localStorage.getItem('token'))
    const setToken = (newToken) => {
        setToken_(newToken);
    };
    console.log(token)

    // Memoized value of the authentication context
    const contextValue = useMemo(() => ({
        token,
        setToken,
    }), [token]);

    // const handleAuth = async (email, contrasena) => {
    //   const tokenSession = localStorage.getItem('token')
    //   console.log(tokenSession)
    // };

    return (
      <AuthContext.Provider value={{ contextValue }}>
        {children}
      </AuthContext.Provider>
    );
}

export const useAuth = () => {
  return useContext(AuthContext)
};
