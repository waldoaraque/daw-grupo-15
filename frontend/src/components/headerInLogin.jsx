import { Link } from 'react-router-dom'

export default function headerInLogin() {
  return(
    <div>
      <div className='header-container'>
        <div className='image1-container'>
          <img className='image1' src='/manosPlaneta.png' alt='' />
        </div>
        <div className='logo-container'>
          <img className='logo' src='/ecoWiseLogo.png' alt='' />
          <p className='logo-message'>  Tu aplicación de aprendizaje amigable con el medio ambiente  </p>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <Link to='/login' >LOGIN</Link>
          </li>
          <li>
            <Link to='/signup' >SIGNUP</Link>
          </li>
          <li>
            <Link to='/contact' >CONTACTO</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
