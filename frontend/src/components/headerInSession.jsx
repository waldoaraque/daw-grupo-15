import { Link } from "react-router-dom";

export default function headerInSession() {
  return(
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/home" >HOME</Link>
          </li>
          <li>
            <Link to="/temario" >TEMARIO</Link>
          </li>
          <li>
            <Link to="/diccionario" >ECO DICCIONARIO</Link>
          </li>
          <li>
            <Link to="/ranking" >RANKING</Link>
          </li>
          <li>
            <Link to="/foro" >FORO</Link>
          </li>
          <li>
            <Link to="/contact" >CONTACTO</Link>
          </li>
          <li>
            <Link to="/logout" >CERRAR SESIÓN</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}