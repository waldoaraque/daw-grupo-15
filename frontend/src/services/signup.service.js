import { apiURL } from './config.js'

export const signupService = async (data)  => { 
  try {
    const res = await fetch(`${http}://${apiHost}:${apiPort}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"nombre_usuario": data.name, "apellido_usuario": data.apellido, "email": data.email, "contrasena": data.contrasena }),
    });
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
