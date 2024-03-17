import { Router } from "express"
import { 
  generateWord,
  getWordsByCategory
} from "../controllers/index.js"

const diccionarioRouter = Router()

diccionarioRouter.get("/palabras", (req, res) => {
  res.json({ message: "you are in path /api/palabras/" })
})

diccionarioRouter.get(`/palabras/:search`, generateWord)
diccionarioRouter.get(`/palabras/:category`, getWordsByCategory)

export default diccionarioRouter
