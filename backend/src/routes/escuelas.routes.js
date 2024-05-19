import { Router } from "express"
import {
  getEscuelas,
  getEscuelaById,
  createEscuela,
  updateEscuela,
  deleteEscuela
} from "../controllers/index.js"

const escuelasRouter = Router()

escuelasRouter.get("/escuelas", getEscuelas)

escuelasRouter.get("/escuelas/:id", getEscuelaById)

escuelasRouter.post("/escuelas", createEscuela)

escuelasRouter.put("/escuelas/:id", updateEscuela)

escuelasRouter.delete("/escuelas/:id", deleteEscuela)

export default escuelasRouter
