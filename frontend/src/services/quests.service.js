import { apiHost, apiPort } from './config.js'
import { setToken } from './token.service.js'

export const createQuestService = async (quest, { token }) => { 
  let bearerToken = setToken(token)
  const apiUrl = `http://${apiHost}:${apiPort}/api/quests`
  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: JSON.stringify(quest)
    })
    if (res.ok) {
      const quests = await res.json()
      return quests
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }
}

export const postQuestService = async ({ token }) => { 

}
