import DefaultLayout from '../layout/DefaultLayout'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../auth/AuthProvider'
import Modal from '../components/modal'
import DynamicForm from '../components/form'
import { listTemasService } from '../services/temas.service'

export default function Foro() {
    const { token, user, tokenPayload } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [listTema, setListTema] = useState(null)

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

    const openModal = () => {
        setIsModalOpen(true)
    }
    
    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleSubmitTema = (input) => {
        if (input.username !== '' && input.password !== '') {
          // servicio para crear temas
          return
        }
        alert('No se están enviando los datos, por favor verifique los datos.')
    }

    const foroFields = [
        { 
            type: 'text',
            name: 'tituloTema',
            className: '',
            //pattern: '',//'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
            placeholder: 'Título del tema',
            required: true 
          },
          { 
            type: 'text',
            name: 'descripcionTema',
            className: '',
            //pattern: '',//'(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}',
            placeholder: 'Descripción del tema',
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
                            <button
                                onClick={openModal}
                            >Crear Tema
                            </button>
                        )}
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            <div>
                                <DynamicForm 
                                    formTitle='Crea un tema en el Foro'
                                    fields={foroFields}
                                    onSubmit={handleSubmitTema}
                                    buttonText='Crear Tema'
                                />
                            </div>
                        </Modal>
                        {listTema ? (
                            <div>
                                {listTema.map((tema, index) => (
                                    <div key={index}>
                                        <Link 
                                            to={`/temas/${tema.id_tema}`}
                                            state={{ tema }}
                                        >
                                            <p>{tema.titulo_tema}</p>
                                        </Link>
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
