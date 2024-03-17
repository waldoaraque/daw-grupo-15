import { Router } from "express"
import {
  getForos,
  getForoById,
  createForo,
  updateForo,
  deleteForo
} from "../controllers/index.js"

const foroRouter = Router()

foroRouter.get("/foro", getForos)

foroRouter.get("/foro/:id", getForoById)

foroRouter.post("/foro", createForo);

foroRouter.put("/foro/:id", updateForo);

foroRouter.delete("/foro/:id", deleteForo);

export default foroRouter
