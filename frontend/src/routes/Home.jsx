import DefaultLayout from '../layout/DefaultLayout'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'

export default function Home() {
    const { user, token, logOut } = useAuth()

    if(!user) {
        return <Navigate to='/login' />
    }

    return (
        <DefaultLayout>
            <div className='login-container'>
                <header>
                    <h1>Bienvenido Mi Aplicación</h1>
                </header>
                <section>
                    <p>
                        ¡Descubre todo lo que nuestra aplicación puede ofrecer!
                        <br></br>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque velit reiciendis doloremque possimus sapiente molestias quia debitis pariatur temporibus, 
                        <br></br>
                        aperiam recusandae nobis perferendis, nostrum autem! Libero aut ipsum ad sit.
                    </p>    
                </section>
                <section>
                <input type="text" name="" id="" defaultValue='test'/>
                    <h2>Características destacadas:</h2>
                    <ul>
                        <li>Funcionalidad 1</li>
                        <li>Funcionalidad 2</li>
                        <li>Funcionalidad 3</li>
                    </ul>
                </section>
                <section>
                    <h2>Únete a nosotros ahora:</h2>
                    <p>Regístrate para obtener acceso exclusivo.</p>
                    <button><Link to='/contact'>Contáctanos</Link></button>
                </section>
                <footer>
                    <p>&copy; 2024 EcoWise. Todos los derechos reservados. </p>
                </footer>
            </div>
        </DefaultLayout>
    )
}