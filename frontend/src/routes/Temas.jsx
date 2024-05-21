//import Mensaje from './mensaje'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import DefaultLayout from '../layout/DefaultLayout'
import DynamicForm from '../components/form'
import { listMensajesService, postMensajesService } from '../services/mensajes.service'

export default function Temas () {
    const { id } = useParams()
    const location = useLocation()
    const [tema, setTema] = useState(location.state?.tema || null)

    const { user, token, tokenPayload } = useAuth()
    const [listMensajes, setListMensajes] = useState(null)
    
    useEffect(() => {
        if (!user) {
            return // No hacer nada si no hay usuario
        }
        const listMensajes = async () => {
            try {
                // Realizar la búsqueda utilizando el servicio del API backend
                const result = await listMensajesService(id, { token })
                setListMensajes(result)
            } catch (error) {
                console.error('Error al extraer foros:', error)
            }
        }
        listMensajes()
    }, [user, token, id])

    const handleSubmitMensaje = async (input, resetForm) => {
        if (input.contenidoMensaje !== '') {
            // id , input.contenidoMensaje , 
            // servicio para crear temas
            let result = await postMensajesService({'contenido_mensaje': input.contenidoMensaje, 'tema_id': id }, { token })
            setListMensajes(prevMensajes => [result, ...prevMensajes])
            resetForm()
            
            alert('tu mensaje ha sido publicado!')
            return
        }
        alert('No se está publicando el mensaje, por favor verifique los datos.')
    }

    const mensajeFields = [
        { 
            type: 'textarea',
            name: 'contenidoMensaje',
            className: '',
            //pattern: '',//'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
            placeholder: 'Escribe tu mensaje...',
            required: false
        }
    ]

    if(!user) {
        return <Navigate to='/login' />
    }

    return (
        <DefaultLayout>
            <div>
                <div>
                    <h1>{tema.titulo_tema}</h1>
                    <p>{tema.descripcion_tema}</p>
                </div>
                <br />

                {listMensajes && Array.isArray(listMensajes) ? (
                    listMensajes.map((mensaje, index) => (

                        <div key={mensaje.id_mensaje}>
                            <p > {mensaje.nombre_usuario} </p>
                            <p >{mensaje.contenido_mensaje}</p>
                            <p >{mensaje.fechapub_mensaje}</p>
                        </div>
                        
                    ))
                ) : (
                    <p>Cargando mensajes...</p>
                )}

                <DynamicForm
                    fields={mensajeFields}
                    onSubmit={handleSubmitMensaje}
                    buttonText='Publicar Mensaje'
                />
            </div>
        </DefaultLayout>
    )   
}
