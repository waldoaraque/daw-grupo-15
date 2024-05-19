import { Children } from "react";
import headerInLogin from "../components/headerInLogin";
import { useAuth } from "../auth/AuthProvider";
import headerInSession from "../components/headerInSession";

export default function DefaultLayout({children}) {
    const { user, logOut } = useAuth()
    let headerState = false

    if(!user) {
        headerState = true
    }

    const handleLogout = () => {
        logOut() // Llamar a la función de cierre de sesión al hacer clic en el botón
    }

    return(
        <>
        
            { headerState 
                ? headerInLogin() 
                : headerInSession() 
            }
            <main>
                {children}
            </main>
        </>
    )
}