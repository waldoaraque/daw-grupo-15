import DefaultLayout from "../layout/DefaultLayout"
import { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"

export default function Login() {
  const navigate = useNavigate()
  
  const { handleSubmit, register } = useForm();
  const [email, setEmail] = useState("")
  const [contrasena, setContrasena] = useState("")
  const { token } = useAuth()
  
  // if (token) {
  //     return <Navigate to="/dashboard" />
  // }

  async function consulta(data) {
    const API_HOST = 'http://localhost';
    const API_PORT = '4000';
    try {
      console.log(data.email, data.contrasena);
      const res = await fetch(`${API_HOST}:${API_PORT}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": data.email, "contrasena": data.contrasena }),
      });
      if (res.ok) {
        const data = await res.json();
        const accessToken = data.access_token;
        localStorage.setItem('token', accessToken);
        navigate('/dashboard')
      } else {
        console.error('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit(consulta)}>
        <h1>Login</h1>
        {/* <label>Email</label> */}
        <input type="text" placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" value={email} {...register('email')} onChange={(e) => setEmail(e.target.value)}/>

        {/* <label>Password</label> */}
        {/* <input type="password" placeholder="Contraseña" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"  value={contrasena} {...register('contrasena')} onChange={(e) => setContrasena(e.target.value)}/> */}
        <input type="password" placeholder="Contraseña"  value={contrasena} {...register('contrasena')} onChange={(e) => setContrasena(e.target.value)}/>
        {/*
            bug con tecla Enter
        */}

        <button>Login</button>
      </form>
    </DefaultLayout>
  )
}
