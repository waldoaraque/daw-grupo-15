import { Router } from "express"
import {
  getContenidos,
  getContenidoById,
  createContenido,
  updateContenido,
  deleteContenido
} from "../controllers/index.js"

import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })

const contenidosRouter = Router()

contenidosRouter.get("/contenidos", getContenidos)

contenidosRouter.get("/contenidos/:id", getContenidoById)

contenidosRouter.post("/contenidos", upload.single('video'), createContenido)

contenidosRouter.put("/contenidos/:id", upload.single('video'), updateContenido)

contenidosRouter.delete("/contenidos/:id", deleteContenido)

export default contenidosRouter
