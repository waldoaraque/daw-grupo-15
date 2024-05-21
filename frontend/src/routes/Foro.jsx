import DefaultLayout from '../layout/DefaultLayout'
import { Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
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

export default function Foro() {
    const { token, user, tokenPayload } = useAuth()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [listTema, setListTema] = useState(null)
    const [selectedTema, setSelectedTema] = useState(null)

    useEffect(() => {
        if (!user && !tokenPayload) {
            return 
        }

        const listTemas = async () => {
            try {
                // Realizar la búsqueda utilizando el servicio del API backend
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

    const handleSubmitTema = async (input, resetForm) => {
        if (input.tituloTema !== '' && input.descripcionTema !== '') {
          // servicio para crear temas
          let result = await createTemaService({'titulo_tema': input.tituloTema, 'descripcion_tema': input.descripcionTema}, { token })
          setListTema(prevTemas => [result, ...prevTemas])
          resetForm()
          closeCreateModal()
          alert('tu tema ha sido publicado!')
          return
        }
        alert('No se están enviando los datos, por favor verifique los datos.')
    }

    const handleUpdateTema = async (input, resetForm) => {
        if (input.tituloTema !== '' && input.descripcionTema !== '') {
            // servicio para actualizar temas
            let result = await updateTemaService(selectedTema.id_tema, {'titulo_tema': input.tituloTema, 'descripcion_tema': input.descripcionTema}, { token })
            setListTema(prevTemas => prevTemas.map(tema =>
                tema.id_tema === selectedTema.id_tema ? result : tema
            ))
            resetForm()
            closeEditModal()
            alert('tu tema ha sido publicado!')
            return
        }
        alert('No se están enviando los datos, por favor verifique los datos.')
    }

    const handleDeleteTema = async (input, resetForm) => {
        if (input.tituloTema === 'Eliminar') {
            // servicio para eliminar temas
            console.log(selectedTema)
            let result = await deleteTemaService(selectedTema.id_tema, { token })
            setListTema(result)
            resetForm()
            closeDeleteModal()
            alert('tu tema ha sido eliminado!')
            return
        }
        alert('No se están enviando los datos, por favor verifique los datos.')
    }

    const foroFields = [
        { 
            type: 'text',
            name: 'tituloTema',
            className: '',
            //pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
            placeholder: 'Título del tema',
            required: true 
        },
        {
            type: 'text',
            name: 'descripcionTema',
            className: '',
            //pattern: '(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}',
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

    if(!user) {
        return <Navigate to='/login' />
    }

    return (
        <DefaultLayout>
            <div>
                { tokenPayload ? (
                    <>       
                        <h1>Foro</h1>
                        { (tokenPayload.user_type === 'educador' || tokenPayload.user_type === 'director') && (
                            <>
                                <button
                                    onClick={openCreateModal}
                                >Crear Tema
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
                            <div>
                                {listTema.map((tema, index) => (
                                    <div key={tema.id_tema}>
                                        <Link 
                                            to={`/temas/${tema.id_tema}`}
                                            state={{ tema }}
                                        >
                                            <p>{tema.titulo_tema}</p>
                                        </Link>
                                        { (tokenPayload.user_type === 'educador' || tokenPayload.user_type === 'director') && (
                                            <>
                                                <FontAwesomeIcon icon={faPen} onClick={() => openEditModal(tema)} />
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
                                        { (tokenPayload.user_type === 'director') && (
                                            <>
                                                <FontAwesomeIcon icon={faTrash} onClick={() => openDeleteModal(tema)}/>
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
                            <p>Cargando foros...</p>
                        )}
                    </>
                ): (
                    <p>Cargando...</p>
                )}
            </div>
        </DefaultLayout>
    )
}
