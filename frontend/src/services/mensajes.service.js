import { apiHost, apiPort } from './config.js'
import { setToken } from './token.service.js'

export const listMensajesService = async (id, { token }) => {
  let bearerToken = setToken(token)
  const apiUrl = `http://${apiHost}:${apiPort}/api/mensajes/${id}`
  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      }
    })
    if (res.ok) {
      const mensajes = await res.json()
      console.log(mensajes)
      return mensajes
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }
}

export const postMensajesService = async (message, {token}) => {
  let bearerToken = setToken(token)
  const apiUrl = `http://${apiHost}:${apiPort}/api/mensajes`
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: JSON.stringify(message)
    })
    if (res.ok) {
      const mensajes = await res.json()
      return mensajes
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }
}