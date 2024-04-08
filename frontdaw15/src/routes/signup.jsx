import DefaultLayout from "../layout/DefaultLayout"
import { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { Navigate, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"

export default function Signup() {
    const [name, setName] = useState("")
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("")
    const [contrasena, setContrasena] = useState("")
    const { handleSubmit, register } = useForm();
    const {token} = useAuth();
    const navigate = useNavigate()

    async function singup(data) {
        const API_HOST = 'http://localhost';
        const API_PORT = '4000';
        try {
          console.log(data.name, data.apellido, data.email, data.contrasena);
          const res = await fetch(`${API_HOST}:${API_PORT}/api/signup`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"nombre_usuario": data.name, "apellido_usuario": data.apellido, "email": data.email, "contrasena": data.contrasena }),
          });
          if (res.ok) {
            const data = await res.json();
            const accessToken = data.access_token;
            localStorage.setItem('token', accessToken);
            navigate('/dashboard')
          } else {
            console.error('Signup Fallido');
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
    }

    return (
        <DefaultLayout>
            <form className="form" onSubmit={handleSubmit(singup)}>
                <h1>Signup</h1>

                {/* <label>Name</label> */}
                <input type="text" placeholder="Nombre" pattern="[A-Za-z]+" value={name} {...register('name')} onChange={(e) => setName(e.target.value)}/>

                {/* <label>Apellido</label> */}
                <input type="text" placeholder="Apellido" pattern="[A-Za-z]+" value={apellido} {...register('apellido')} onChange={(e) => setApellido(e.target.value)}/>

                {/* <label>Email</label> */}
                <input type="email" placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" value={email} {...register('email')} onChange={(e) => setEmail(e.target.value)} />

                {/* <label>Password</label> */}
                <input type="password" placeholder="Contraseña" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}" value={contrasena} {...register('contrasena')} onChange={(e) => setContrasena(e.target.value)} />

                <button>Register</button>
            </form>
        </DefaultLayout>
    )
}