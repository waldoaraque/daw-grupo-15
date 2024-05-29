import DefaultLayout from '../layout/DefaultLayout'
import DynamicForm from '../components/form'
import Modal from '../components/modal'
import { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signupService } from '../services/signup.service'

export default function Signup() {
    const [name, setName] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [contrasena, setContrasena] = useState('')
    const { handleSubmit, register } = useForm()
    const [messageModalSuccess, setMessageModalSuccess] = useState(false)
    const [messageModalError, setMessageModalError] = useState(false)

    const handleSignup = async (data) => {
        try {
            const status = await signupService({ 'email': data.email, 'contrasena': data.contrasena })
          //setUser(user)
          //setEmail('')
          //setContrasena('')
          //navigate('/dashboard')
        } catch (error) {

        }
    }

    const closeModalSuccess = () => setMessageModalSuccess(false)
    const closeModalError  = () => setMessageModalError(false)

    const signupFields = [
        {
            type: 'text',
            name: 'nombre',
            className: 'input-login-text',
            //pattern: '',
            placeholder: 'Nombre',
            required: true
        },
        {
            type: 'text',
            name: 'apellido',
            className: 'input-login-text',
            //pattern: '',
            placeholder: 'Apellido',
            required: true
        },
        {
            type: 'text',
            name: 'email',
            className: 'input-login-text',
            //pattern: '',
            placeholder: 'Email',
            required: true
        },
        {
            type: 'password',
            name: 'password',
            className: 'input-login-password',
            //pattern: '',
            placeholder: 'Contraseña',
            required: true
        },
        {
            type: 'password',
            name: 'password',
            className: 'input-login-password',
            //pattern: '',
            placeholder: 'Repetir Contraseña',
            required: true
        }
    ]

    return (
        <DefaultLayout>
            <div className='login-container'>
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
                {/* <select name="select">
                    <option value="estudiante">Estudiante</option>
                    <option value="educador" selected>Educador</option>
                    <option value="director">Director</option>
                </select> */}
                <DynamicForm 
                    formTitle='SignUp'
                    fields={signupFields}
                    onSubmit={handleSignup}
                    buttonText='Registrarme'
                />
            </div>
        </DefaultLayout>
    )
}