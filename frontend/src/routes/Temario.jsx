import DefaultLayout from '../layout/DefaultLayout'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function Foro() {
    const { user } = useAuth()

    if(!user) {
        return <Navigate to='/login' />
    }

    return (
        <DefaultLayout>
            <div>
                <h1>Temario</h1>
                {/* Lista de Contenidos */}
                    {/* Contenido + Quest */}
            </div>
        </DefaultLayout>
    )
}
