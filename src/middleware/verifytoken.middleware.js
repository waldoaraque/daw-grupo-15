import jwt from "jsonwebtoken"
import { secretjwt } from "../config.js"

export const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  jwt.verify(token, secretjwt, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Token inválido' })
    }

    req.userId = decoded.userId // Agregar el ID de usuario al objeto de solicitud
    next()
  })
}