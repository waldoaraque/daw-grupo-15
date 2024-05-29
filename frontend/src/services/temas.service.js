import { apiURL } from './config.js'
import { setToken } from './token.service.js'

export const listTemasService = async ({ token })  => {
  let bearerToken = setToken(token)
  const endpoint = `${apiURL}/api/temas`
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      }
    })
    if (res.ok) {
      const temas = await res.json()
      return temas
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }
}

export const createTemaService = async (tema, {token}) => { 
  let bearerToken = setToken(token)
  const endpoint = `${apiURL}/api/temas`
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: JSON.stringify(tema)
    })
    if (res.ok) {
      const temas = await res.json()
      return temas
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }
}

export const updateTemaService = async (id, tema, {token}) => { 
  let bearerToken = setToken(token)
  const endpoint = `${apiURL}/api/temas/${id}`
  try {
    const res = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: JSON.stringify(tema)
    })
    if (res.ok) {
      const temas = await res.json()
      return temas
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }
}

export const deleteTemaService = async (id, {token}) => { 
  let bearerToken = setToken(token)
  const endpoint = `${apiURL}/api/temas/${id}`
  try {
    const res = await fetch(endpoint, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      }
    })
    if (res.ok) {
      const temas = await res.json()
      return temas
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }
}
