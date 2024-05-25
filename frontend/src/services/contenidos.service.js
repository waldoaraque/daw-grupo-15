import { apiHost, apiPort } from './config.js'
import { setToken } from './token.service.js'

export const getContentService = async ({ token }) => { 
  let bearerToken = setToken(token)
  const apiUrl = `http://${apiHost}:${apiPort}/api/contenidos`
  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      }
    })
    if (res.ok) {
      const contenidos = await res.json()
      return contenidos
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }
}

export const createContentService = async (contenido, { token }) => { 
  let bearerToken = setToken(token)
  const apiUrl = `http://${apiHost}:${apiPort}/api/contenidos`
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': bearerToken
      },
      body: contenido
    })
    if (res.ok) {
      const contenidos = await res.json()
      return contenidos
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }

}

export const updateContentService = async (id, contenido, { token }) => { 
  let bearerToken = setToken(token)
  const apiUrl = `http://${apiHost}:${apiPort}/api/contenidos/${id}`
  try {
    const res = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: JSON.stringify(contenido)
    })
    if (res.ok) {
      const contenidos = await res.json()
      return contenidos
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }
}

export const deleteContentService = async (id, { token }) => { 
  let bearerToken = setToken(token)
  const apiUrl = `http://${apiHost}:${apiPort}/api/contenidos/${id}`
  try {
    const res = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      }
    })
    if (res.ok) {
      const contenidos = await res.json()
      return contenidos
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }
}
