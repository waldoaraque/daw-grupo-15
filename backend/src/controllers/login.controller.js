import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { secretjwt } from "../config.js"
import {
  selectByParamsConditionQuery
} from "../model/index.js"

const usuarioTabla = "usuarios"

const generateToken = (userData) => {
  const token = jwt.sign(userData, secretjwt, {expiresIn: "2h"})
  return token
}

export const login = async (req, res, next) => {
  try {
    const {
      email,
      contrasena
    } = req.body
    // Verificar las credenciales
    const validateCredentials = await selectByParamsConditionQuery(
      usuarioTabla,
      ["id_usuario", "email", "contrasena", "tipo_usuario", "nombre_usuario", "apellido_usuario"],
      "email = $1",
      [email]
    )
    if (validateCredentials.length !== 1) {
      return res
                .status(401)
                .json({ message: "Invalid Credentials" })  
    }
    const usuario = validateCredentials[0]
    const hashedPassword = await bcrypt.compare(contrasena, usuario.contrasena)
    if (hashedPassword) {
      const token = generateToken({ 
        user_id: usuario.id_usuario,
        email: usuario.email,
        user_type: usuario.tipo_usuario,
        user_fullname: `${usuario.nombre_usuario} ${usuario.apellido_usuario}`
      })
      res
        .status(200)
        .json({ access_token: token })
    }
  } catch (error) {
    next(error)
  }
}