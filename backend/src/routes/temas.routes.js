import { Router } from "express"
import {
  getTemas,
  getTemaById,
  createTema,
  updateTema,
  deleteTema
} from "../controllers/index.js"

const temasRouter = Router()

temasRouter.get("/temas", getTemas)

temasRouter.get("/temas/:id", getTemaById)

temasRouter.post("/temas", createTema)

temasRouter.put("/temas/:id", updateTema)

temasRouter.delete("/temas/:id", deleteTema)

export default temasRouter
