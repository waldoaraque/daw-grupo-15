import { Router } from "express"
import {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
} from "../controllers/index.js"

const usuariosRouter = Router()

usuariosRouter.get("/usuarios", getUsuarios)

usuariosRouter.get("/usuarios/:id", getUsuarioById)

usuariosRouter.post("/usuarios", createUsuario);

usuariosRouter.put("/usuarios/:id", updateUsuario);

usuariosRouter.delete("/usuarios/:id", deleteUsuario);

export default usuariosRouter
