import pkg from "bcrypt"
import { 
  insertQuery,
  selectByIdQuery
} from "../model/index.js"

const bcrypt = pkg

export const createUsuario = async (req, res, next) => {
  try {
    const {
      usuario_nombre,
      usuario_apellido,
      email,
      contrasena,
      tipo_usuario,
      escuela_id,
      foto_usuario
    } = req.body

    const hashedPassword = await bcrypt.hash(contrasena, 10)
    
    const userData = {
      usuario_nombre,
      usuario_apellido,
      email,
      contrasena: hashedPassword,
      tipo_usuario,
      escuela_id,
      foto_usuario
    }

    const newUsuario = await insertQuery('usuarios', userData)    
    res
      .status(201)
      .json(newUsuario)
  } catch (error) {
    next(error)
  }
}

export const getUsuario = async (req, res, next) => {
  try {
    const { id } = req.params

    const usuarioData = await selectByIdQuery('usuarios', id)
    if (usuarioData.rows.length === 0)
      return res
              .status(404)
              .json({ message: "User not found" })
    res
      .status(200)
      .json(usuarioData.rows[0])
  } catch (error) {
    next(error)
  }
}