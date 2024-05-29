import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function headerInSession() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return(
    <div>
      <div className='header-container'>
        <div className='logo-container'>
          <img className='logo' src='/logo_v3.png' alt='' />
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
          <li><Link to='/home'>Home</Link></li>
          <li><Link to='/temario'>Temario</Link></li>
          <li><Link to='/diccionario'>Eco Diccionario</Link></li>
          <li><Link to='/ranking'>Ranking de Usuarios</Link></li>
          <li><Link to='/foro'>Foro</Link></li>
          <li><Link to='/contact'>Contacto</Link></li>
          <li><Link to='/logout'>Cerrar Sesión</Link></li>
        </ul>
      </nav>
    </div>
  );
}