import { Link } from "react-router-dom"

export default function headerInLogin() {
  return(
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/login" >Login</Link>
          </li>
          <li>
            <Link to="/signup" >Signup</Link>
          </li>
          {/* <li>
              <Link to="/dashboard" >Dashboard</Link>
          </li> */}
          <li>
            <Link to="/contact" >Contactanos</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
