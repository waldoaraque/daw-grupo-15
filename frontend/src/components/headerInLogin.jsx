import { Link } from "react-router-dom"

export default function headerInLogin() {
  return(
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/login" >LOGIN</Link>
          </li>
          <li>
            <Link to="/signup" >SIGNUP</Link>
          </li>
          <li>
            <Link to="/contact" >CONTACTO</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
