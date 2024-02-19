import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' 

const APISERVER_URL = 'http://localhost'
const APISERVER_PORT = '4000'

const Login = () => {
  const navigate = useNavigate()
  const [email, setUsername] = useState('')
  const [contrasena, setPassword] = useState('')

  const handleLogin = async () => {
    // Aquí puedes implementar la lógica de autenticación
    console.log('Usuario:', email, 'Contraseña:', contrasena)
    try {
      const res = await fetch(`${APISERVER_URL}:${APISERVER_PORT}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          contrasena
        })
      })
      if (res.ok) {
        // Lógica cuando el inicio de sesión es exitoso
        console.log('Inicio de sesión exitoso')
        const data = await res.json()
        const accessToken = data.access_token
        localStorage.setItem('token', accessToken)
        navigate('/main')
      } else {
        // Lógica cuando el inicio de sesión falla
        console.error('Inicio de sesión fallido')
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error)
    }
  }

  const handleSignin = () => {
    // Aquí puedes implementar la lógica de registro de usuario
    
  }

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form>
        <label>
          Usuario:
          <input
            type="text"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Iniciar sesión
        </button>
        <button type="button" onClick={handleSignin}>
          Registrarse
        </button>
      </form>
      
    </div>
  )
}

export default Login