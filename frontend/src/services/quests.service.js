import { apiURL } from '../config.js'
import { setToken } from './token.service.js'

export const createQuestService = async (quest, { token }) => { 
  let bearerToken = setToken(token)
  const endpoint = `${apiURL}/api/quests`
  try {
    const res = await fetch(endpoint, {
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

export const postQuestService = async (answer, { token }) => { 
  let bearerToken = setToken(token)
  const endpoint = `${apiURL}/api/answers`
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      },
      body: JSON.stringify(answer)
    })
    if (res.ok) {
      const answers = await res.json()
      return answers
    } else {
      console.error('Error en respuesta' + res.status + res.json())
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }
}

export const listQuestService = async (id, { token }) => { 
  let bearerToken = setToken(token)
  const endpoint = `${apiURL}/api/quests/${id}`
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearerToken
      }
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