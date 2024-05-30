import { apiURL } from '../config.js'

export const signupService = async (data)  => { 
  try {
    const res = await fetch(`${apiURL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    if (res.ok) {
      return res.status
    } else {
      return res.status
    }
  } catch (error) {
    return 400
    //console.error('Error al realizar la solicitud:', error);
  }
}
