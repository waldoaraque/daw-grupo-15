import { apiHost, apiPort } from './config.js'
import { setToken } from './token.service.js'

export const listTemasService = async ({ token })  => {
  let bearerToken = setToken(token)
  const apiUrl = `http://${apiHost}:${apiPort}/api/temas`
  try {
    const res = await fetch(apiUrl, {
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
  const apiUrl = `http://${apiHost}:${apiPort}/api/temas`
  try {
    const res = await fetch(apiUrl, {
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
  const apiUrl = `http://${apiHost}:${apiPort}/api/temas/${id}`
  try {
    const res = await fetch(apiUrl, {
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
  const apiUrl = `http://${apiHost}:${apiPort}/api/temas/${id}`
  try {
    const res = await fetch(apiUrl, {
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
