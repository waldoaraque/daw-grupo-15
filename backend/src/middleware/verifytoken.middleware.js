import jwt from "jsonwebtoken"
import { secretjwt } from "../config.js"

export const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  const token = req.headers.authorization.split(' ')[1]

  jwt.verify(token, secretjwt, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Token inválido' })
    }
    req.userId = decoded.user_id // Agregar el ID de usuario al objeto de solicitud
    req.userRol = decoded.user_type // Agregar el Rol de usuario al objeto de solicitud
    next()
  })
}