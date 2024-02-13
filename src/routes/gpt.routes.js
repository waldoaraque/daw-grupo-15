import { Router } from "express"
import {
  generateWord,
} from "../controllers/gpt.controller.js"

const gptRouter = Router()
gptRouter.get("/palabras", (req, res) => {
  res.json({ message: "you are in path /api/palabras/" })
})
gptRouter.get("/palabras/:id", generateWord)

export default gptRouter
