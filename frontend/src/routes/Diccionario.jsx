import DefaultLayout from "../layout/DefaultLayout";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import Modal from "../components/modal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { diccionarioCategoryService, diccionarioWordService } from "../services/diccionario.service";

export default function Diccionario() {
    const { user } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(null) // Estado para almacenar la búsqueda por palabra
    const [searchResult, setSearchResult] = useState(null) // Estado para almacenar la búsqueda por letra

    const {token} = user

    const openModal = () => {
        setIsModalOpen(true);
    }
    
    const closeModal = () => {
        setIsModalOpen(false);
    }

    const alphabet = Array.from(Array(26), (_, i) => String.fromCharCode(65 + i))

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const getWordByLetter = async (letter) => {
        // Aquí puedes realizar alguna acción en función de la letra seleccionada
        console.log(`Letra seleccionada: ${letter}`)
        try {
            // Realizar la búsqueda utilizando el servicio del API backend
            const results = await diccionarioCategoryService(letter, { token })
            console.log(results)
            setSearchResult(results)
            setIsModalOpen(true)
        } catch (error) {
            console.error('Error al buscar la palabra:', error);
        }
    }

    const getWordBySearch = async () => {
        try {
          // Realizar la búsqueda utilizando el servicio del API backend
            const result = await diccionarioWordService(searchTerm, { token })
            setSearchResult(result)
            setIsModalOpen(true)

        } catch (error) {
            console.error('Error al buscar la palabra:', error);
        }
    }

    if(!user) {
        return <Navigate to="/login" />
    }

    return (
        <DefaultLayout>
            <div className="diccionario">
                <div className='search-container'>
                    <h1>ECO DICCIONARIO</h1>
                        <input
                            className='search-input'
                            type="text"
                            placeholder="Buscar palabra..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button 
                            onClick={getWordBySearch}
                            className='search-button'
                        ><FontAwesomeIcon icon={faSearch} />
                        </button>
                </div>
                <div className="button-container">
                    {alphabet.map(letter => (
                    <button
                        key={letter} 
                        className="button-list" 
                        onClick={() => getWordByLetter(letter)}
                    >
                        {letter}
                    </button>
                    ))}
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    {searchResult && !Array.isArray(searchResult) && (
                        <div>
                            <h1>{searchResult.palabra.toUpperCase()}</h1>
                            <p>{searchResult.definicion}</p>
                        </div>
                        
                    )}

                    {searchResult && Array.isArray(searchResult) && searchResult.length > 1 && (
                        <div>
                            
                            {searchResult.map((item, index) => (
                                <div key={index}>
                                    <h1>{item.palabra.toUpperCase()}</h1>
                                    <p>{item.definicion}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {searchResult && Array.isArray(searchResult) && !searchResult.length && (
                        <div>
                            <p>No hay datos para esta búsqueda.</p>
                        </div>
                    )}
                </Modal>
            </div>
        </DefaultLayout>
    )
}