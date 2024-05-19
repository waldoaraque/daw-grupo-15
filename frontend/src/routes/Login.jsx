import DefaultLayout from "../layout/DefaultLayout"
import { useState, useEffect } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { Navigate } from 'react-router-dom'

export default function Login() {
  const { user, loginAction } = useAuth()
  const [input, setInput] = useState({
    username: "",
    password: ""
  })

  

  const handleInput = (e) => {
    const { name, value } = e.target
    setInput((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    if (input.username !== "" && input.password !== "") {
      loginAction(input)
      return
    }
    alert("No se están enviando los datos, por favor verifique el usuario y las credenciales.")
  }

  if (user) {
    return <Navigate to="/home" />
  }

  return (
    <DefaultLayout>
      <form className="form" onSubmit={handleSubmitLogin}>
        <h1>Login</h1>
        {/* <label>Email</label> */}
        <input
          className="input-login-text"
          type="text"
          name="username"
          placeholder="Email"
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
          // value={email} {...register('email')}
          onChange={handleInput}
        />

        {/* <label>Password</label> */}
        <input 
          className="input-login-password"
          type="password"
          placeholder="Contraseña"
          name="password"
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
          // value={contrasena} {...register('contrasena')}
          onChange={handleInput}
        />
        {/*
            bug con tecla Enter
        */}
        <button className="button" >LogIn</button>
      </form>
    </DefaultLayout>
  )
}
