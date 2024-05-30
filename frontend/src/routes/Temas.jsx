import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import DefaultLayout from '../layout/DefaultLayout'
import DynamicForm from '../components/form'
import Modal from '../components/modal'
import { 
    listMensajesService, 
    postMensajesService 
} from '../services/mensajes.service'

export default function Temas() {
    const { id } = useParams()
    const location = useLocation()
    const [tema, setTema] = useState(location.state?.tema || null)
    const [messageModalSuccess, setMessageModalSuccess] = useState(false)
    const [messageModalError, setMessageModalError] = useState(false)

    const { user, token, tokenPayload, logOut } = useAuth()
    const [listMensajes, setListMensajes] = useState(null)

    if (!user && !token) {
        return <Navigate to='/login' />
    }

    useEffect(() => {
        if (!user) {
            return <Navigate to='/login' />
        }
        const listMensajes = async () => {
            try {
                const result = await listMensajesService(id, { token })
                setListMensajes(result)
            } catch (error) {
                console.error('Error al extraer foros:', error)
            }
        }
        listMensajes()
    }, [user, token, id, logOut])

    const handleSubmitMensaje = async (input, resetForm) => {
        if (input.contenidoMensaje !== '') {
            try {
                let result = await postMensajesService({ 'contenido_mensaje': input.contenidoMensaje, 'tema_id': id }, { token });

                if (result && result.id_mensajes) {
                    const mensajeConUsuario = {
                        ...result,
                        nombre_usuario: tokenPayload.user_fullname,
                        apellido_usuario: ''
                    };

                    setListMensajes(prevMensajes => {
                        return Array.isArray(prevMensajes) ? [mensajeConUsuario, ...prevMensajes] : [mensajeConUsuario];
                    });
                    resetForm();
                    setMessageModalSuccess('Se ha publicado tu mensaje!');
                } else {
                    setMessageModalError('Error al publicar el mensaje. Por favor, inténtelo de nuevo.');
                }
            } catch (error) {
                console.error('Error al publicar mensaje:', error);
                setMessageModalError('Error al publicar el mensaje. Por favor, inténtelo de nuevo.');
            }
            return;
        }
        setMessageModalError('No se está pasando texto, por favor verifique.');
        return;
    }

    const closeModalSuccess = () => setMessageModalSuccess(false)
    const closeModalError  = () => setMessageModalError(false)

    const mensajeFields = [
        {
            type: 'textarea',
            name: 'contenidoMensaje',
            className: '',
            placeholder: 'Escribe tu mensaje...',
            required: false
        }
    ]

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const options = { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit', 
          hour12: true 
        }
        return date.toLocaleDateString('es-ES', options)
    }

    return (
        <DefaultLayout>
            <div className="tema-container">
                <div className="tema-header">
                    <h1 className="tema-title">{tema.titulo_tema}</h1>
                    <p className="tema-description">{tema.descripcion_tema}</p>
                </div>
                <br />

                <div className="form-container">
                    <DynamicForm
                        fields={mensajeFields}
                        onSubmit={handleSubmitMensaje}
                        buttonText='Publicar Mensaje'
                    />
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
                </div>

                {listMensajes && Array.isArray(listMensajes) ? (
                    <div className="mensaje-container">
                        {listMensajes.map((mensaje, index) => (
                            <div className="mensaje-item" key={mensaje.id_mensaje || index}>
                                <div className="mensaje-header">
                                    <p className="mensaje-usuario">{mensaje.nombre_usuario} {mensaje.apellido_usuario}</p>
                                    <p className="mensaje-fecha">{formatDate(mensaje.fechapub_mensaje)}</p>
                                </div>
                                <p className="mensaje-contenido">{mensaje.contenido_mensaje}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="loading-message">Cargando mensajes...</p>
                )}
            </div>
        </DefaultLayout>
    )
}
