import bcrypt from "bcrypt"
import {
  insertQuery
} from "../model/index.js"

const usuarioTabla = "usuarios"

export const signup =async (req, res, next) => {
  try {
    const {
      nombre_usuario,
      apellido_usuario,
      email,
      contrasena,
      tipo_usuario,
    } = req.body

    const hashedPassword = await bcrypt.hash(contrasena, 10)

    const userData = {
      nombre_usuario,
      apellido_usuario,
      email,
      contrasena: hashedPassword,
      tipo_usuario: 'estudiante',
      escuela_id: 1,
      foto_usuario: null
    }

    const newUsuario = await insertQuery(usuarioTabla, userData)
    res
      .status(201)
      .json(newUsuario)
  } catch (error) {
    next(error)
  }
}