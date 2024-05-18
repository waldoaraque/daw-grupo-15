import { Router } from "express"
import {
  getMensajesByTema,
} from "../controllers/index.js"

const mensajesRouter = Router()

mensajesRouter.get("/mensajes/:id", getMensajesByTema)

export default mensajesRouter
