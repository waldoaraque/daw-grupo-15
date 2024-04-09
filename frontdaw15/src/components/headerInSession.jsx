import { Link } from "react-router-dom";

export default function headerInSession() {




  
  return(
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/home" >Home</Link>
          </li>
          <li>
            <Link to="/diccionario" >Diccionario</Link>
          </li>
          <li>
            <Link to="/foro" >Foro</Link>
          </li>
          <li>
            <Link to="/contact" >Contacto</Link>
          </li>
          <li>
            <Link to="/logout" >Cerrar Sesión</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}