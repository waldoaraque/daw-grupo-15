import DefaultLayout from '../layout/DefaultLayout'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function Home() {
    const { user, token, tokenPayload, logOut } = useAuth()

    if(!user) {
        return <Navigate to='/login' />
    }

    return (
        <DefaultLayout>
            <div className='main-container'>
                <header>
                    <h1>Bienvenido {tokenPayload.user_fullname}</h1>
                </header>
                <section>
                    <p>
                        <br></br>
                        <br></br>
                        ¡Descubre todo lo que nuestra aplicación puede ofrecer!
                        <br></br>
                        <br></br>
                    </p>    
                </section>
                <section>
                    <h2>Características destacadas:</h2>
                    <br />
                    <ul>
                        <li><h4>Temario:</h4> Aquí encontrarás contenidos referentes al medio ambiente, ecología y otras cosas que los educadores vayan subiendo!</li><br />
                        <li><h4>Eco Diccionario:</h4> Aquí podrás buscar palabras relacionadas al medio ambiente, como también consultar por letras, además podrás generarlas, ¿qué esperas?</li><br />
                        <li><h4>Ranking de Usuarios:</h4> Aquí podrás ir acumulando puntos para motivarte a contribuir con nuestras iniciativas y contenidos.</li><br />
                        <li><h4>Foro:</h4> Contamos con un foro en dónde habrán diferentes temas en los cuales podrás participar dejando mensajes.</li><br />
                    </ul>
                </section>
                <section>
                    <p>Para dudas o comentarios: <button><Link to='/contact'>contáctanos</Link></button></p>
                </section>
                <footer>
                    <br />
                    <p>&copy; 2024 EcoEducation. Todos los derechos reservados. </p>
                </footer>
            </div>
        </DefaultLayout>
    )
}