import { apiURL } from '../config.js'
import { setToken } from './token.service.js'

export const diccionarioWordService = async (palabra, { token })  => { 
  let bearerToken = setToken(token)
  const endpoint = `${apiURL}/api/palabras/${palabra}`
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      }
    })
    if (res.ok) {
      const word = await res.json()
      return word
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }

}

export const diccionarioCategoryService = async (category, { token })  => { 
  let bearerToken = setToken(token)
  const endpoint = `${apiURL}/api/palabras/${category}`
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      }
    })
    if (res.ok) {
      const words = await res.json()
      return words
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }

}
