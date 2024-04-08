import { Children } from "react";
import { Link } from "react-router-dom";

export default function DefaultLayout({children}) {
    return(
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/signup" >Signup</Link>
                        </li>
                        <li>
                            <Link to="/dashboard" >Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/contact" >Contactanos</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main>
                {children}
            </main>
        </>
    )
}