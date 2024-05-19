//import Mensaje from "./mensaje"
import { useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useAuth } from "../auth/AuthProvider"
import DefaultLayout from "../layout/DefaultLayout"
import { listMensajesService } from "../services/mensajes.service"

export default function Temas () {
    const { id } = useParams()
    const location = useLocation()
    const [tema, setTema] = useState(location.state?.tema || null)

    const { user, token } = useAuth()
    const [listMensajes, setListMensajes] = useState(null)
    
    useEffect(() => {
        if (!user) {
            return; // No hacer nada si no hay usuario
        }
        const listMensajes = async () => {
            try {
                // Realizar la búsqueda utilizando el servicio del API backend
                const result = await listMensajesService(id, { token });
                setListMensajes(result);
            } catch (error) {
                console.error('Error al extraer foros:', error);
            }
        };
        listMensajes();
    }, [user, token, id])

    if(!user) {
        return <Navigate to="/login" />
    }

    return (
        <DefaultLayout>
            <div>
                <h1>{tema.titulo_tema}</h1>
                <p>{tema.descripcion_tema}</p>

                <br />

                {listMensajes && Array.isArray(listMensajes) ? (
                    listMensajes.map((mensaje, index2) => (

                        <div>
                            <p key={index2}> {mensaje.nombre_usuario} </p>
                            <p key={index2}>{mensaje.contenido_mensaje}</p>
                            <p key={index2}>{mensaje.fechapub_mensaje}</p>
                        </div>
                        
                    ))
                ) : (
                    <p>Cargando mensajes...</p>
                )}
            </div>
        </DefaultLayout>
    );   
}
