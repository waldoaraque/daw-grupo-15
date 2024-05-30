import { Router } from "express"
import { 
  generateWord,
  getCategoriesWords
} from "../controllers/index.js"

const diccionarioRouter = Router()

diccionarioRouter.get("/palabras", (req, res) => {
  res.json({ message: "you are in path /api/palabras/" })
})

diccionarioRouter.get("/palabras/:search", generateWord)
diccionarioRouter.get("/categorias/:category", getCategoriesWords)


export default diccionarioRouter
