import { Router } from "express"
import {
  getPuntuacionesData
} from "../controllers/index.js"

const ptsRouter = Router()

ptsRouter.get("/puntuaciones", getPuntuacionesData)

export default ptsRouter
