import DefaultLayout from "../layout/DefaultLayout"
import { loginService } from "../services/login.service"
import { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { Navigate } from 'react-router-dom'
import { useForm } from "react-hook-form"

export default function Login() {
  const { handleSubmit, register } = useForm()
  const [email, setEmail] = useState("")
  const [contrasena, setContrasena] = useState("")
  const { user, setUser } = useAuth()
  async function login(data) {
    try {
      const user = await loginService({ "email": data.email, "contrasena": data.contrasena })
      setUser(user)
      window.localStorage.setItem(
        'userSession', JSON.stringify(user)
      )
      setEmail('')
      setContrasena('')
    } catch (error) {
      
    }
    
  }

  if (user) {
    return <Navigate to="/home" />
  }

  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmit(login)}>
        <h1>Login</h1>
        <div>Esto es producción!</div>
        {/* <label>Email</label> */}
        <input className="input-login-text" type="text" placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" value={email} {...register('email')} onChange={(e) => setEmail(e.target.value)}/>

        {/* <label>Password</label> */}
        {/* <input type="password" placeholder="Contraseña" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"  value={contrasena} {...register('contrasena')} onChange={(e) => setContrasena(e.target.value)}/> */}
        <input className="input-login-password" type="password" placeholder="Contraseña"  value={contrasena} {...register('contrasena')} onChange={(e) => setContrasena(e.target.value)}/>
        {/*
            bug con tecla Enter
        */}

        <button className="button" >Login</button>
      </form>
    </DefaultLayout>
  )
}
