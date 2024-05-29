import { apiURL } from './config.js'

export const loginService = async (creds)  => { 
  const endpoint = `${apiURL}/api/login`
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    })
    if (res.ok) {
      const { access_token } = await res.json()
      const responseUserData = {
        "username": creds.email,
        "token": access_token
      }
      return responseUserData
      //const accessToken = data.access_token
      //localStorage.setItem('token', accessToken)
    } else {
      console.error('Inicio de sesión fallido')
      return
    }
  } catch (error) {
    console.error('Error al realizar la solicitud:', error)
    return
  }

}
