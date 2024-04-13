import DefaultLayout from "../layout/DefaultLayout";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";
import { diccionarioWordService } from "../services/diccionario.service";

export default function Diccionario() {
    const { user } = useAuth()
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResult, setSearchResult] = useState(null); // Estado para almacenar el resultado de la búsqueda

    const {token} = user

    const alphabet = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i))

    // const filteredAlphabet = alphabet.filter(letter =>
    //     letter.toLowerCase().includes(searchTerm.toLowerCase())
    // )

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleClick = async (letter) => {
        // Aquí puedes realizar alguna acción en función de la letra seleccionada
        console.log(`Letra seleccionada: ${letter}`);
        //const dicc = await diccionarioWordService(letter)


    }

    const handleSearchClick = async () => {
        try {
          // Realizar la búsqueda utilizando el servicio del API backend
            const result = await diccionarioWordService(searchTerm, { token })
            setSearchResult(result)
        } catch (error) {
            console.error('Error al buscar la palabra:', error);
        }
    }

    if(!user) {
        return <Navigate to="/login" />
    }

    return (
        <DefaultLayout>
            <div>
                
                <h1>ECO Diccionario</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Buscar palabra..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleSearchClick}>Buscar</button>
                    {searchResult && (
                        <div>
                        <h2>Resultado:</h2>
                        <p>{searchResult}</p>
                        </div>
                    )}
                </div>
                <div className="button-container">
                    {alphabet.map(letter => (
                    <button key={letter} className="button" onClick={() => handleClick(letter)}>
                        {letter}
                    </button>
                    ))}
                </div>
                
            </div>
        </DefaultLayout>
    )
}