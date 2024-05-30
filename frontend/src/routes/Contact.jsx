import emailjs from 'emailjs-com'
import DefaultLayout from '../layout/DefaultLayout'
import DynamicForm from '../components/form'
import Modal from '../components/modal'
import { useForm } from 'react-hook-form'
import { useAuth } from '../auth/AuthProvider'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { serviceEmailID, templateEmailID, userEmailID } from '../config'

export default function Contact () {
    //const { user, tokenPayload,  } = useAuth()
    const [messageModalSuccess, setMessageModalSuccess] = useState(false)
    const [messageModalError, setMessageModalError] = useState(false)

    const handlePostContact = (formData, resetForm) => {
        // servicio para usar contacto
        emailjs.send(serviceEmailID, templateEmailID, formData, userEmailID)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text)
                setMessageModalSuccess('Se ha enviado tu mensaje, en breve te responderemos!')
                resetForm()
            }, (error) => {
                console.log('FAILED...', error)
                setMessageModalError('Ha ocurrido un error, no se ha enviado tu mensaje!')
                resetForm()
            })
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
                    formTitle='Contáctanos'
                    fields={contactFields}
                    onSubmit={handlePostContact}
                    buttonText='Enviar'
                />
            </div>
        </DefaultLayout>
    )
}