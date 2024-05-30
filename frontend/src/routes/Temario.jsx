import DefaultLayout from '../layout/DefaultLayout'
import Modal from '../components/modal'
import DynamicForm from '../components/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../auth/AuthProvider'
import {
    getContentService,
    createContentService,
    updateContentService,
    deleteContentService
} from '../services/contenidos.service'
import { createQuestService } from '../services/quests.service'

export default function Foro() {
    const { user, token, tokenPayload, logOut } = useAuth()

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const [listContent, setListContent] = useState(null)
    const [selectedContent, setSelectedContent] = useState(null)

    const [messageModalSuccess, setMessageModalSuccess] = useState(false)
    const [messageModalError, setMessageModalError] = useState(false)

    if(!user) {
        <Navigate to='/login' />
    }

    useEffect(() => {
        if (!user && !tokenPayload) {
            logOut()
        }

        const __listContent = async () => {
            try {
                const result = await getContentService({ token })
                setListContent(result)
            } catch (error) {
                console.error('Error al extraer foros:', error)
            }
        }

        __listContent()
    }, [user, token, logOut])

    const openCreateModal = () => setIsCreateModalOpen(true)
    const closeCreateModal = () => setIsCreateModalOpen(false)

    const openEditModal = (contenido) => {
        setSelectedContent(contenido)
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => setIsEditModalOpen(false)

    const openDeleteModal = (contenido) => {
        setSelectedContent(contenido)
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = () => setIsDeleteModalOpen(false)

    const closeModalSuccess = () => setMessageModalSuccess(false)
    const closeModalError  = () => setMessageModalError(false)

    const handleSubmitContent = async (input, resetForm) => {
        if (input.title !== '' && input.content !== '') {
            if (input.video && !(input.video instanceof File) || (input.video && input.video.size === 0)) {
                setMessageModalError('El archivo de video no es válido o está vacío.')
                return
            }
            const data = new FormData()
            data.append('titulo_contenido', input.title)
            data.append('descripcion_contenido', input.content)
            data.append('video', input.video)
            
            let contentResult = await createContentService(
            // descripcion_contenido, titulo_contenido, imagen_contenido, video_contenido
                data,
                { token }
            )

            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    if (key.startsWith('question_')) {
                        let questResult = await createQuestService(
                            // contenido_id, pregunta
                            {
                                'contenido_id': contentResult.id_contenido,
                                'pregunta': input[key]
                            },
                            { token }
                        )
                    }
                }
            }
            setListContent(prevContents => {
                return Array.isArray(prevContents) ? [contentResult, ...prevContents] : [contentResult]
            })
            resetForm()
            closeCreateModal()
            setMessageModalSuccess('Tu contenido ha sido publicado!')
            return
        }
        setMessageModalError('No se están enviando los datos, por favor verifique los datos.')
        return
    }

    const handleUpdateContent = async (input, resetForm) => {
        if (input.title !== '' && input.content !== '' && input.video !== '') {
            if (input.video && !(input.video instanceof File) || (input.video && input.video.size === 0)) {
                setMessageModalError('El archivo de video no es válido o está vacío.')
                return
            }
            const data = new FormData()
            data.append('titulo_contenido', input.title)
            data.append('descripcion_contenido', input.content)
            data.append('video', input.video)

            let result = await updateContentService(
                selectedContent.id_contenido, 
                data,
                { token }
            )
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    if (key.startsWith('question_')) {
                        let questResult = await createQuestService(
                            // contenido_id, pregunta
                            {
                                'contenido_id': result.id_contenido,
                                'pregunta': input[key]
                            },
                            { token }
                        )
                    }
                }
            }
            setListContent(prevTemas => prevTemas.map(content =>
                content.id_contenido === selectedContent.id_contenido ? result : content
            ))
            resetForm()
            closeEditModal()
            setMessageModalSuccess('Tu contenido ha sido actualizado!')
            return
        }
        setMessageModalError('No se están enviando los datos, por favor verifique los datos.')
        return
    }

    const handleDeleteContent = async (input, resetForm) => {
        if (input.titulo === 'Eliminar') {
            let result = await deleteContentService(selectedContent.id_contenido, { token })
            setListContent(prevContents => prevContents.filter(content => content.id_contenido !== selectedContent.id_contenido))
            resetForm()
            closeDeleteModal()
            setMessageModalSuccess('Tu contenido ha sido eliminado!')
            return
        }
        setMessageModalError('No se están enviando los datos, por favor verifique los datos.')
        return
    }

    const temarioFields = [
        { 
            type: 'text', 
            name: 'title', 
            label: 'Título', 
            placeholder: 'Ingresa el título', 
            required: true 
        },
        { 
            type: 'textarea', 
            name: 'content', 
            label: 'Contenido',
            placeholder: 'Descripción...', 
            required: true 
        },
        { 
            type: 'file', 
            name: 'video', 
            label: 'Subir Video', 
            accept: 'videos/*',  
            required: true
        }
    ]
    
    const contenidoDeleteFields = [
        {
            type: 'text',
            name: 'titulo',
            className: '',
            pattern: 'Eliminar',
            placeholder: 'Eliminar',
            required: true
        }
    ]

    return (
        <DefaultLayout>
            <div className="main-container">
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
                {tokenPayload ? (
                    <>
                        <h1 className="foro-title">Temario</h1>
                        {(tokenPayload.user_type === 'educador') && (
                            <>
                                <button className="foro-button" onClick={openCreateModal}>
                                    Crear Contenido
                                </button>
                                <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal}>
                                    <div>
                                        <DynamicForm
                                            formTitle='Crea un contenido para el Temario'
                                            fields={temarioFields}
                                            onSubmit={handleSubmitContent}
                                            buttonText='Publicar'
                                            fieldsOptional={true}
                                            buttonAdd={true}
                                        />
                                    </div>
                                </Modal>
                            </>
                        )}

                        {listContent ? (
                            <div className="foro-list">
                                {listContent.map((contenido, index) => (
                                    <div className="foro-item" key={contenido.id_contenido}>
                                        <Link to={`/contenidos/${contenido.id_contenido}`} state={{ contenido }}>
                                            <p>{contenido.titulo_contenido}</p>
                                        </Link>
                                        {(tokenPayload.user_type === 'educador') && (
                                            <>
                                                <FontAwesomeIcon 
                                                    icon={faPen} 
                                                    className="foro-icon-edit"
                                                    onClick={() => openEditModal(contenido)} 
                                                />
                                                <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                                                    <div>
                                                        <DynamicForm
                                                            formTitle='Edita el Contenido'
                                                            fields={temarioFields}
                                                            onSubmit={handleUpdateContent}
                                                            buttonText='Actualizar Contenido'
                                                            buttonAdd={true}
                                                        />
                                                    </div>
                                                </Modal>
                                            </>
                                        )}
                                        {tokenPayload.user_type === 'educador' && (
                                            <>
                                                <FontAwesomeIcon 
                                                    icon={faTrash} 
                                                    className="foro-icon-delete" 
                                                    onClick={() => openDeleteModal(contenido)} 
                                                />
                                                <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
                                                    <div>
                                                        <DynamicForm
                                                            formTitle='Se va a eliminar el contenido seleccionado'
                                                            formSubtitle='Por favor escribir `Eliminar` para confirmar'
                                                            fields={contenidoDeleteFields}
                                                            onSubmit={handleDeleteContent}
                                                            buttonText='Eliminar Contenido'
                                                        />
                                                    </div>
                                                </Modal>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="loading-message">Cargando Contenidos...</p>
                        )}
                    </>
                ) : (
                    <p className="loading-message">Cargando...</p>
                )}
            </div>
        </DefaultLayout>
    )
}
