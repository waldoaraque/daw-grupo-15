import { login } from './login.controller.js'

import { 
  getUsuarios,
  getUsuarioById, 
  createUsuario,
  updateUsuario,
  deleteUsuario
} from './usuarios.controller.js'

import { 
  generateWord 
} from './diccionario.controller.js'

export {
  login,
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  generateWord
}