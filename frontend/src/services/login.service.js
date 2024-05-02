import { apiHost, apiPort } from './config.js'

export const loginService = async (creds)  => { 
  const apiUrl = `http://${apiHost}:${apiPort}/api/login`
  try {
    const res = await fetch(apiUrl, {
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
