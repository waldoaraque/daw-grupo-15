import DefaultLayout from '../layout/DefaultLayout'
import DynamicForm from '../components/form'
import Modal from '../components/modal'
import { useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { signupService } from '../services/signup.service'

export default function Signup() {
    const { user, loginAction } = useAuth()
    const [ status, setStatus ] = useState(false)
    const [messageModalSuccess, setMessageModalSuccess] = useState(false)
    const [messageModalError, setMessageModalError] = useState(false)

    if (user) {
        return <Navigate to='/home' />
    }

    const handleSignup = async (input) => {
        if (input.nombre !== '' && input.apellido !== '' && input.username !== '' && input.password) {
            const status = await signupService(
                {   
                    'nombre_usuario': input.nombre,
                    'apellido_usuario': input.apellido,
                    'email': input.username, 
                    'contrasena': input.password
                })
            if (status !== 201) {
                setMessageModalError('No se ha logrado completar el registro de usuario.')
                return
            }
            loginAction(input)
            return
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
            name: 'username',
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
            name: 'password_two',
            className: 'input-login-password',
            //pattern: '',
            placeholder: 'Repetir Contraseña',
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