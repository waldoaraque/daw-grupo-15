import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function headerInSession() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
          <li><Link to='/home'>HOME</Link></li>
          <li><Link to='/temario'>TEMARIO</Link></li>
          <li><Link to='/diccionario'>ECO DICCIONARIO</Link></li>
          <li><Link to='/ranking'>RANKING</Link></li>
          <li><Link to='/foro'>FORO</Link></li>
          <li><Link to='/contact'>CONTACTO</Link></li>
          <li><Link to='/logout'>CERRAR SESIÓN</Link></li>
        </ul>
      </nav>
    </div>
  );
}