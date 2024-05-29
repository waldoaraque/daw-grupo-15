import DefaultLayout from '../layout/DefaultLayout'
import DynamicForm from '../components/form'
import Modal from '../components/modal'
import { useForm } from 'react-hook-form'
import { useAuth } from '../auth/AuthProvider'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

export default function Contact () {
    //const { user, tokenPayload,  } = useAuth()
    const [messageModalSuccess, setMessageModalSuccess] = useState(false)
    const [messageModalError, setMessageModalError] = useState(false)

    const handlePostContact = () => {
        // servicio para usar contacto
    }

    const closeModalSuccess = () => setMessageModalSuccess(false)
    const closeModalError  = () => setMessageModalError(false)

    const contactFields = [
        {
            type: 'text',
            name: 'email',
            className: 'input-login-text',
            //pattern: '',
            placeholder: 'Email',
            required: true
        },
        {
            type: 'textarea',
            name: 'message',
            className: 'input-login-text',
            //pattern: '',
            placeholder: 'Escribe tu mensaje...',
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
                <DynamicForm 
                    formTitle='Contáctanos'
                    fields={contactFields}
                    onSubmit={handlePostContact}
                    buttonText='Enviar'
                />
            </div>
        </DefaultLayout>
    )
}