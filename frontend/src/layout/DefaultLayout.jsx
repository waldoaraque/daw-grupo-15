import { Children } from "react"
import headerInLogin from "../components/headerInLogin"
import { useAuth } from "../auth/AuthProvider"
import headerInSession from "../components/headerInSession"

export default function DefaultLayout({children}) {
    const { user } = useAuth()
    let headerState = false

    if(!user) {
        headerState = true
    }

    return(
        <>
            { headerState 
                ? headerInLogin() 
                : headerInSession() 
            }
            { user ? (<div className="user-session"><p>Sesión: {user}</p></div>) : ( <></>) }
            
            <main>
                {children}
            </main>
        </>
    )
}