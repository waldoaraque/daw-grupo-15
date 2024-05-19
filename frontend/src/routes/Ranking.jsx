import DefaultLayout from '../layout/DefaultLayout'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthProvider'
import { listPtsUsers } from '../services/ranking.service'

export default function Ranking() {
    const { user, token } = useAuth()
    const [listUsersDataPts, setListUsersDataPts] = useState(null)
    
    if(!user) {
        return <Navigate to='/login' />
    }

    useEffect(() => {
      if (!user) {
          return // No hacer nada si no hay usuario
      }
      const listPts = async () => {
          try {
              const result = await listPtsUsers({ token })
              setListUsersDataPts(result)
          } catch (error) {
              console.error('Error al extraer puntuaciones:', error)
          }
      }
      listPts()
  }, [user, token])

    return (
        <DefaultLayout>
            <div>
                <h1>Ranking</h1>
                <section>
                    <p>
                        ¡Aquí puedes ver el listado de los estudiantes más comprometidos! 🤓
                        <br></br>
                        Los puntajes se componen de la siguiente manera:
                        <br></br>
                        - Las quest de los temarios suman 10pts.
                        <br></br>
                        - Las búsquedas o consultas en el diccionario ecológico suman 5pts.
                        <br></br>
                        - Los mensajes en el foro suman 2pts.
                        <br></br>
                    </p>    
                </section>
                <div>
                    <br />
                    {listUsersDataPts && Array.isArray(listUsersDataPts) ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Email</th>
                                    <th>Puntos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUsersDataPts.map((puntuaciones, index) => (
                                    <tr key={index}>
                                        <td>{puntuaciones.nombre_usuario} {puntuaciones.apellido_usuario}</td>
                                        <td>{puntuaciones.email}</td>
                                        <td>{puntuaciones.total_pts}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>Cargando usuarios...</p>
                    )}
                </div>
            </div>
        </DefaultLayout>
    )
}