import { apiHost, apiPort } from './config.js'
import { setToken } from './token.service.js'

export const listPtsUsers = async ({ token })  => {
  let bearerToken = setToken(token)
  const apiUrl = `http://${apiHost}:${apiPort}/api/puntuaciones`
  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      }
    })
    if (res.ok) {
      const ptsData = await res.json()
      return ptsData
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }
}
