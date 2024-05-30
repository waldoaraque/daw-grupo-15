import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import DefaultLayout from '../layout/DefaultLayout'
import DynamicForm from '../components/form'
import Modal from '../components/modal'
import {
    postQuestService, 
    listQuestService 
} from '../services/quests.service'

export default function Contenido () {
    const { id } = useParams()
    const location = useLocation()
    const [contenido, setContenido] = useState(location.state?.contenido || null)
    const [messageModalSuccess, setMessageModalSuccess] = useState(false)
    const [messageModalError, setMessageModalError] = useState(false)
    const [quests, setQuests] = useState(false)

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const [video, setVideo] = useState(null)
    let responsesFields = []

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
        if (quests) {
            const results = []
    
            for (const i in quests) {
                const questionId = quests[i].id_quest
                const answerKey = `answer_${i}`
                
                if (input.hasOwnProperty(answerKey)) {
                    const answer = input[answerKey]
                    if (answer) {
                        const result = await postQuestService(
                            {
                                respuesta: answer, 
                                quest_id: questionId 
                            }, 
                            { token }
                        )
                        results.push(result)
                    }
                }
            }
            resetForm()
            closeCreateModal()
            setMessageModalSuccess('Respuesta enviada!')
            return
        }
    
        setMessageModalError('No se están obteniendo las preguntas, por favor verifique.')
        return
    }

    const listQuests = async () => {
        let result = await listQuestService(id, { token })
        return result
    }

    const closeModalSuccess = () => setMessageModalSuccess(false)
    const closeModalError  = () => setMessageModalError(false)

    const openCreateModal = async () => {
        const quests = await listQuests()
        setQuests(quests)
        setIsCreateModalOpen(true)
        
    }
    const closeCreateModal = () => setIsCreateModalOpen(false)

    if (quests) {
        let i = 0
        for (const key in quests) {
            responsesFields.push(
                { 
                    type: 'textarea', 
                    name: `answer_${i}`, 
                    label: quests[key].pregunta, 
                    placeholder: 'Ingresa tu respuesta', 
                    required: true,
                    questionId: quests[key].id_quest
                }
            )
            i += 1
        }
    }
    
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
                        
                        <video class="responsive-video" width="400" controls preload='auto' muted >
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
            </div>
        </DefaultLayout>
    )
}
