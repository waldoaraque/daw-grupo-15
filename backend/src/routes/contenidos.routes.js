import { Router } from "express"
import {
  getContenidos,
  getContenidoById,
  createContenido,
  updateContenido,
  deleteContenido
} from "../controllers/index.js"

import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const contenidosRouter = Router()

contenidosRouter.get("/contenidos", getContenidos)

contenidosRouter.get("/contenidos/:id", getContenidoById)

contenidosRouter.post("/contenidos", upload.single('video'), async (req, res) => {
  const {file} = req.body
  console.log(req)
} )

contenidosRouter.put("/contenidos/:id", updateContenido)

contenidosRouter.delete("/contenidos/:id", deleteContenido)

export default contenidosRouter
