import '../styles/Foro.css'
import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import Modal from '../components/modal'
import DynamicForm from '../components/form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import {
    createTemaService,
    deleteTemaService,
    listTemasService,
    updateTemaService
} from '../services/temas.service'
import DefaultLayout from '../layout/DefaultLayout'

export default function Foro() {
    const { token, user, tokenPayload } = useAuth()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [listTema, setListTema] = useState(null)
    const [selectedTema, setSelectedTema] = useState(null)
    const [messageModalSuccess, setMessageModalSuccess] = useState(false)
    const [messageModalError, setMessageModalError] = useState(false)

    useEffect(() => {
        if (!user && !tokenPayload) {
            return
        }

        const listTemas = async () => {
            try {
                const result = await listTemasService({ token })
                setListTema(result)
            } catch (error) {
                console.error('Error al extraer foros:', error)
            }
        }

        listTemas()
    }, [user, token])

    const openCreateModal = () => setIsCreateModalOpen(true)
    const closeCreateModal = () => setIsCreateModalOpen(false)

    const openEditModal = (tema) => {
        setSelectedTema(tema)
        setIsEditModalOpen(true)
    }

    const closeEditModal = () => setIsEditModalOpen(false)

    const openDeleteModal = (tema) => {
        setSelectedTema(tema)
        setIsDeleteModalOpen(true)
    }

    const closeDeleteModal = () => setIsDeleteModalOpen(false)

    const closeModalSuccess = () => setMessageModalSuccess(false)
    const closeModalError  = () => setMessageModalError(false)

    const handleSubmitTema = async (input, resetForm) => {
        if (input.tituloTema !== '' && input.descripcionTema !== '') {
            let result = await createTemaService({ 'titulo_tema': input.tituloTema, 'descripcion_tema': input.descripcionTema }, { token })
            setListTema(prevTemas => [result, ...prevTemas])
            resetForm()
            closeCreateModal()
            setMessageModalSuccess('Tu tema ha sido publicado!')
            return
        }
        setMessageModalError('No se están enviando los datos, por favor verifique los datos.')
        return
    }

    const handleUpdateTema = async (input, resetForm) => {
        if (input.tituloTema !== '' && input.descripcionTema !== '') {
            let result = await updateTemaService(selectedTema.id_tema, { 'titulo_tema': input.tituloTema, 'descripcion_tema': input.descripcionTema }, { token })
            setListTema(prevTemas => prevTemas.map(tema =>
                tema.id_tema === selectedTema.id_tema ? result : tema
            ))
            resetForm()
            closeEditModal()
            setMessageModalSuccess('Tu tema ha sido actualizado!')
            return
        }
        setMessageModalError('No se están enviando los datos, por favor verifique los datos.')
        return
    }

    const handleDeleteTema = async (input, resetForm) => {
        if (input.tituloTema === 'Eliminar') {
            let result = await deleteTemaService(selectedTema.id_tema, { token })
            setListTema(result)
            resetForm()
            closeDeleteModal()
            setMessageModalSuccess('Tu tema ha sido eliminado!')
            return
        }
        setMessageModalError('No se están enviando los datos, por favor verifique los datos.')
        return
    }

    const foroFields = [
        {
            type: 'text',
            name: 'tituloTema',
            className: '',
            placeholder: 'Título del tema',
            required: true
        },
        {
            type: 'text',
            name: 'descripcionTema',
            className: '',
            placeholder: 'Descripción del tema',
            required: true
        }
    ]

    const foroDeleteFields = [
        {
            type: 'text',
            name: 'tituloTema',
            className: '',
            pattern: 'Eliminar',
            placeholder: 'Eliminar',
            required: true
        }
    ]

    if (!user) {
        return <Navigate to='/login' />
    }

    return (
        <DefaultLayout>
            <div className="foro-container">
                <Modal isOpen={messageModalSuccess} message={messageModalSuccess} type='success' onClose={closeModalSuccess} />
                <Modal isOpen={messageModalError} message={messageModalError} type='error' onClose={closeModalError} />
                {tokenPayload ? (
                    <>
                        <h1 className="foro-title">Foro</h1>
                        {(tokenPayload.user_type === 'educador' || tokenPayload.user_type === 'director') && (
                            <>
                                <button className="foro-button" onClick={openCreateModal}>
                                    Crear Tema
                                </button>
                                <Modal isOpen={isCreateModalOpen} onClose={closeCreateModal}>
                                    <div>
                                        <DynamicForm
                                            formTitle='Crea un tema en el Foro'
                                            fields={foroFields}
                                            onSubmit={handleSubmitTema}
                                            buttonText='Crear Tema'
                                        />
                                    </div>
                                </Modal>
                            </>
                        )}

                        {listTema ? (
                            <div className="foro-list">
                                {listTema.map((tema, index) => (
                                    <div className="foro-item" key={tema.id_tema}>
                                        <Link to={`/temas/${tema.id_tema}`} state={{ tema }}>
                                            <p>{tema.titulo_tema}</p>
                                        </Link>
                                        {(tokenPayload.user_type === 'educador' || tokenPayload.user_type === 'director') && (
                                            <>
                                                <FontAwesomeIcon icon={faPen} className="foro-icon" onClick={() => openEditModal(tema)} />
                                                <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                                                    <div>
                                                        <DynamicForm
                                                            formTitle='Edita el tema'
                                                            fields={foroFields}
                                                            onSubmit={handleUpdateTema}
                                                            buttonText='Actualizar Tema'
                                                        />
                                                    </div>
                                                </Modal>
                                            </>
                                        )}
                                        {tokenPayload.user_type === 'director' && (
                                            <>
                                                <FontAwesomeIcon icon={faTrash} className="foro-icon" onClick={() => openDeleteModal(tema)} />
                                                <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
                                                    <div>
                                                        <DynamicForm
                                                            formTitle='Se va a eliminar el tema seleccionado'
                                                            formSubtitle='Por favor escribir `Eliminar` para confirmar'
                                                            fields={foroDeleteFields}
                                                            onSubmit={handleDeleteTema}
                                                            buttonText='Eliminar Tema'
                                                        />
                                                    </div>
                                                </Modal>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="loading-message">Cargando foros...</p>
                        )}
                    </>
                ) : (
                    <p className="loading-message">Cargando...</p>
                )}
            </div>
        </DefaultLayout>
    )
}
