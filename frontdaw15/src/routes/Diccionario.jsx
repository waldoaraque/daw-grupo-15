import DefaultLayout from "../layout/DefaultLayout";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Diccionario() {
    const { user } = useAuth()

    if(!user) {
        return <Navigate to="/login" />
    }

    return (
        <DefaultLayout>
            <div>
                
                    <h1>Diccionario</h1>
              
            </div>
        </DefaultLayout>
    )
}