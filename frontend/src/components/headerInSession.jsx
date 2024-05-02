import { Link } from "react-router-dom";

export default function headerInSession() {
  return(
    <div>
      <div className="header-container">
        <div className="image1-container">
          <img className="image1" src="/manosPlaneta.png" alt="" />
        </div>
        <div className="logo-container">
          <img className="logo" src="/ecoWiseLogo.png" alt="" />
          <p className="logo-message">  Tu aplicación de aprendizaje amigable con el medio ambiente  </p>
        </div>
      </div>
    
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
    </div>
  )
}