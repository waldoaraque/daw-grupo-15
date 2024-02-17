import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { secretjwt } from "../config.js"
import {
  selectByParamsConditionQuery
} from "../model/index.js"

const usuarioTabla = "usuarios"

export const login = async (req, res, next) => {
  try {
    const {
      email,
      contrasena
    } = req.body
    // Verificar las credenciales
    const validateCredentials = await selectByParamsConditionQuery(
      usuarioTabla,
      ['id_usuario', 'email', 'contrasena'],
      'email = $1',
      [email]
    )
    if (validateCredentials.length === 1) {
      const usuario = validateCredentials[0];
      const hashedPassword = await bcrypt.compare(contrasena, usuario.contrasena)
      if (hashedPassword) {
        res.status(200).json({
          message: "Login Successfull"
        })
      }
    } 
    else {
      res.status(401).json({
        error: "Invalid Credentials"
      })
    }
  } catch (error) {
    next(error)
  }
}