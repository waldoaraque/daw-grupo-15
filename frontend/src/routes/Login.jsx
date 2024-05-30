import DefaultLayout from '../layout/DefaultLayout'
import { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { Navigate } from 'react-router-dom'
import DynamicForm from '../components/form'
import Modal from '../components/modal'

export default function Login() {
  const { user, loginAction } = useAuth()
  const [messageModalSuccess, setMessageModalSuccess] = useState(false)
  const [messageModalError, setMessageModalError] = useState(false)

  if (user) {
    return <Navigate to='/home' />
  }

  const handleSubmitLogin = (input) => {
    if (input.username !== '' && input.password !== '') {
      loginAction(input)
      return
    }
    setMessageModalError('No se están enviando los datos, por favor verifique el usuario y las credenciales.')
    return
  }

  const closeModalSuccess = () => setMessageModalSuccess(false)
  const closeModalError  = () => setMessageModalError(false)

  const loginFields = [
    { 
      type: 'text',
      name: 'username',
      className: 'input-login-text',
      placeholder: 'Email',
      formSuggest: `Ejemplo usuario@dominio.com`,
      required: true
    },
    { 
      type: 'password',
      name: 'password',
      className: 'input-login-password',
      placeholder: 'Contraseña',
      required: true 
    }
  ]

  return (
    <DefaultLayout>
      <div className='main-container'>
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
