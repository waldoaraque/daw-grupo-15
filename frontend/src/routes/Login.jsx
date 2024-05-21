import DefaultLayout from '../layout/DefaultLayout'
import { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { Navigate } from 'react-router-dom'
import DynamicForm from '../components/form'

export default function Login() {
  const { user, loginAction } = useAuth()
  

  const handleSubmitLogin = (input) => {
    if (input.username !== '' && input.password !== '') {
      loginAction(input)
      return
    }
    alert('No se están enviando los datos, por favor verifique el usuario y las credenciales.')
  }

  const loginFields = [
    { 
      type: 'text',
      name: 'username',
      className: 'input-login-text',
      //pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
      placeholder: 'Email',
      required: true 
    },
    { 
      type: 'password',
      name: 'password',
      className: 'input-login-password',
      //pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}',
      placeholder: 'Contraseña',
      required: true 
    }
  ]

  if (user) {
    return <Navigate to='/home' />
  }

  return (
    <DefaultLayout>
       <div className="center-container">
      <DynamicForm 
        formTitle='LogIn'
        fields={loginFields}
        onSubmit={handleSubmitLogin}
        buttonText='LogIn'
      />
      </div>
    </DefaultLayout>
  )
}
