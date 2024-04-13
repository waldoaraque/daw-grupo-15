import { apiHost, apiPort } from './config.js'

export const diccionarioWordService = async (palabra, { token })  => { 
  const apiUrl = `http://${apiHost}:${apiPort}/api/palabras/${palabra}`
  try {
    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    if (res.ok) {
      const word = await res.json()
      console.log(word)
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }

}
