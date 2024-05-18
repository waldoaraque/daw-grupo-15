import DefaultLayout from "../layout/DefaultLayout";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import { useAuth } from "../auth/AuthProvider"
import { listTemasService } from "../services/temas.service"

export default function Foro() {
    const { user } = useAuth()
    
    const [listTema, setListTema] = useState(null)

    const {token} = user

    useEffect(() => {
        if (!user) {
            return; // No hacer nada si no hay usuario
        }

        const listTemas = async () => {
            try {
                // Realizar la búsqueda utilizando el servicio del API backend
                const result = await listTemasService({ token });
                setListTema(result);
            } catch (error) {
                console.error('Error al extraer foros:', error);
            }
        };

        listTemas();
    }, [user, token])

    if(!user) {
        return <Navigate to="/login" />
    }

    return (
        <DefaultLayout>
            <div>
                <h1>Foro</h1>
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
                                
                               {/* <p>{foro.description_foro}</p>*/}
                                {/* Aquí puedes añadir más detalles del foro */}

                                {/* 
                                <Temas temas={tema} />
                                
                                */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Cargando foros...</p>
                )}
                {/*  Temas <Tema /> */}
                    {/* Mensajes dentro del tema <Mensaje /> */}

            </div>
        </DefaultLayout>
    )
}
