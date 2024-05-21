import { Link } from 'react-router-dom'
import { useState } from 'react';

export default function headerInLogin() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  return(
    <div>
      <div className='header-container'>
        <div className='logo-container'>
          <img className='logo' src='/ecoWiseLogo.png' alt='' />
          <p className='logo-message'> Tu aplicación de aprendizaje amigable con el medio ambiente  </p>
        </div>
      </div>
      <nav>
       <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className='line'></div>
          <div className='line'></div>
          <div className='line'></div>
        </div>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
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
  );
}
