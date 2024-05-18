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
