import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import DefaultLayout from '../layout/DefaultLayout'
import DynamicForm from '../components/form'
import Modal from '../components/modal'
import { getContentService } from '../services/contenidos.service'
import { createQuestService, postQuestService } from '../services/quests.service'

export default function Contenido () {
    const { id } = useParams()
    const location = useLocation()
    const [contenido, setContenido] = useState(location.state?.contenido || null)
    const [messageModalSuccess, setMessageModalSuccess] = useState(false)
    const [messageModalError, setMessageModalError] = useState(false)

    const { user, token, tokenPayload, logOut } = useAuth()
    // const [listMensajes, setListMensajes] = useState(null)

    if (!user) {
        logOut()
    }

    // useEffect(() => {
    //     if (!user) {
    //         return // No hacer nada si no hay usuario
    //     }
    //     const listMensajes = async () => {
    //         try {
    //             const result = await listMensajesService(id, { token })
    //             setListMensajes(result)
    //         } catch (error) {
    //             console.error('Error al extraer foros:', error)
    //         }
    //     }
    //     listMensajes()
    // }, [user, token, id])

    const handleSubmitMensaje = async (input, resetForm) => {
        // if (input.contenidoMensaje !== '') {
        //     let result = await postMensajesService({ 'contenido_mensaje': input.contenidoMensaje, 'tema_id': id }, { token })
        //     //result =
        //     setListMensajes(prevMensajes => [result, ...prevMensajes])
        //     /*
        //         falta por agregar el nombre y apellido del usuario en tiempo real...
        //     */
        //     resetForm()
        //     setMessageModalSuccess('Se ha publicado tu mensaje!')
        //     return
        // }
        // setMessageModalError('No se está pasando texto, por favor verifique.')
        // return
    }

    const closeModalSuccess = () => setMessageModalSuccess(false)
    const closeModalError  = () => setMessageModalError(false)

    return (
        <DefaultLayout>
            <div className="tema-container">
                <div className="tema-header">
                    <h1 className="tema-title">{contenido.titulo_tema}</h1>
                    <p className="tema-description">{contenido.descripcion_tema}</p>
                </div>
                <br />

                {/* AGREGAR CONTENIDO ... */}


                {/* AGREGAR QUEST EN EL MODAL ... */}

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
