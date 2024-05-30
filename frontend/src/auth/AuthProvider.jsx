import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginService } from '../services/login.service';
import { jwtDecode } from 'jwt-decode';
import Modal from '../components/modal';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(window.localStorage.getItem('userSession') || '');
    const [tokenPayload, setTokenPayload] = useState(null);
    const [messageModalSuccess, setMessageModalSuccess] = useState(false);
    const [messageModalError, setMessageModalError] = useState(false);

    useEffect(() => {
        const storedSession = window.localStorage.getItem('userSession');
        if (storedSession) {
            const { username, token } = JSON.parse(storedSession);
            const payloadToken = jwtDecode(token);

            if (isTokenExpired(payloadToken)) {
                logOut();
            } else {
                setUser(username);
                setToken(token);
                setTokenPayload(payloadToken);
            }
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (token && isTokenExpired(tokenPayload)) {
                console.log("Token expired. Logging out...");
                logOut();
            }
        }, 30000); // Verificar cada minuto

        return () => clearInterval(interval);
    }, [token, tokenPayload]);

    const loginAction = async (data) => {
        try {
            const authentication = await loginService({ email: data.username, contrasena: data.password })
            console.log(authentication)
            if (!authentication) {
                setMessageModalError('Error haciendo LogIn, verifique los datos de email y contraseña.')
                return
            }
            const payloadToken = jwtDecode(authentication.token)
            setUser(authentication.username)
            setToken(authentication.token)
            setTokenPayload(payloadToken)
            window.localStorage.setItem('userSession', JSON.stringify(authentication))
        } catch (error) {
            setMessageModalError('Error haciendo LogIn, verifique los datos de email y contraseña.')
            return
        }
    }

    const logOut = () => {
        setUser(null);
        setToken('');
        setTokenPayload(null);
        window.localStorage.removeItem('userSession');
        console.log("Logged out successfully.");
    };

    const closeModalSuccess = () => setMessageModalSuccess(false);
    const closeModalError = () => setMessageModalError(false);

    const isTokenExpired = (tokenPayload) => {
        if (!token) {
            return true;
        }

        try {
            const now = Date.now() / 1000;
            console.log(`Checking token expiration: ${tokenPayload.exp < now}`);
            return tokenPayload.exp < now;
        } catch (error) {
            console.log("Error decoding token:", error);
            return true;
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, tokenPayload, loginAction, logOut }}>
            <Modal
                isOpen={messageModalSuccess}
                message={messageModalSuccess}
                type='success'
                onClose={closeModalSuccess}
            />
            <Modal
                isOpen={messageModalError}
                message={messageModalError}
                type='error'
                onClose={closeModalError}
            />
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
