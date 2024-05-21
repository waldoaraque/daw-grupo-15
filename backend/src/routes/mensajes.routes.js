import { Router } from "express"
import {
  createMensaje,
  getMensajesByTema,
} from "../controllers/index.js"

const mensajesRouter = Router()

mensajesRouter.get("/mensajes/:id", getMensajesByTema)
mensajesRouter.post("/mensajes", createMensaje)

export default mensajesRouter
