import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import DefaultLayout from '../layout/DefaultLayout'
import DynamicForm from '../components/form'
import Modal from '../components/modal'
import { updateQuestService, postQuestService, getQuestService } from '../services/quests.service'

export default function Contenido () {
    const { id } = useParams()
    const location = useLocation()
    const [contenido, setContenido] = useState(location.state?.contenido || null)
    const [messageModalSuccess, setMessageModalSuccess] = useState(false)
    const [messageModalError, setMessageModalError] = useState(false)

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)

    const [video, setVideo] = useState(null)

    const { user, token, tokenPayload, logOut } = useAuth()

    if (!user && !token) {
        return <Navigate to='/login' />
    }

    useEffect(() => {

    const fetchVideo = async () => {
        const buffer = new Uint8Array(contenido.video_contenido.data)
        const blob = new Blob([buffer], { type: 'video/mp4' })
        const url = URL.createObjectURL(blob)
        setVideo(url)
    }
    
    fetchVideo()
    
    // Limpieza de la URL creada cuando el componente se desmonta
    return () => {
        if (video) {
            URL.revokeObjectURL(video)
        }
    }
    }, [contenido])

    const handleSubmitQuest = async (input, resetForm) => {
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

    const handleUpdateQuest = async (input, resetForm) => {
        for (const key in input) {
            if (input.hasOwnProperty(key)) {
                if (key.startsWith('question_')) {
                    let questResult = await updateQuestService(
                        // contenido_id, pregunta
                        {
                            'contenido_id': id,
                            // necesito el id de la quest también
                            'pregunta': input[key]
                        },
                        { token }
                    )
                }
            }
        }
    }

    const closeModalSuccess = () => setMessageModalSuccess(false)
    const closeModalError  = () => setMessageModalError(false)

    const openEditModal = (quest) => {
        //setSelectedContent(quest)
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => setIsEditModalOpen(false)
    const openCreateModal = () => setIsCreateModalOpen(true)
    const closeCreateModal = () => setIsCreateModalOpen(false)

    const responsesFields = [
        // requiero utilizar la lista de preguntas (quests) para rellenar los fields con los label
        {}
    ]

    return (
        <DefaultLayout>
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
            <div className="tema-container">
                {/* AGREGAR CONTENIDO ... */}
                <div className="tema-header">
                    <h1 className="tema-title">{contenido.titulo_contenido}</h1>
                    <p className="tema-description">{contenido.descripcion_contenido}</p>
                </div>
                <div>
                    {video ? (
                        
                        <video width="600" controls preload='auto' muted >
                            <source src={video}  type="video/mp4" />
                            Tu navegador no soporta el elemento de video.
                        </video>
                    ) : (
                        <p>Cargando video...</p>
                    )}
                </div>
                <br />
                {/* AGREGAR QUEST EN EL MODAL ... */}

                
                {(tokenPayload.user_type === 'estudiante') && (
                    <>
                        <button className="foro-button" onClick={openCreateModal}>
                            Responder Quest
                        </button>
                        <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal}>
                            <div>
                                <DynamicForm
                                    formTitle='Quest'
                                    fields={responsesFields}
                                    onSubmit={handleSubmitQuest}
                                    buttonText='Enviar Respuestas'
                                />
                            </div>
                        </Modal>
                    </>
                )}
                {tokenPayload.user_type === 'educador' && (
                    <>
                        <button className="foro-button" onClick={openEditModal}>
                            Editar Quest
                        </button>
                    
                        <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                            <div>
                                <DynamicForm
                                    formTitle='Edita la Quest'
                                    onSubmit={handleUpdateQuest}
                                    buttonText='Actualizar Quest'
                                    buttonAdd={true}
                                />
                            </div>
                        </Modal>
                    </>
                )}
            </div>
        </DefaultLayout>
    )
}
