import { Router } from "express"
import { 
  generateWord
} from "../controllers/index.js"

const diccionarioRouter = Router()

diccionarioRouter.get("/palabras", (req, res) => {
  res.json({ message: "you are in path /api/palabras/" })
})

diccionarioRouter.get(`/palabras/:search`, generateWord)

export default diccionarioRouter
