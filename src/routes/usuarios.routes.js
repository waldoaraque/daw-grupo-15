import { Router } from "express"
import {
  createUsuario,
  getUsuario
} from "../controllers/usuarios.controller.js"

const usuariosRouter = Router()

// create a task
// router.post("/usuarios", createUser);

// router.get("/usuarios", getAllTasks);
usuariosRouter.get("/usuarios", (req, res) => {
  res.json({ message: "you are in path /api/usuarios/" })
})

usuariosRouter.get("/usuarios/:id", getUsuario)

// usuariosRouter.put("/tasks/:id", updateTask);

// usuariosRouter.delete("/tasks/:id", deleteTask);

export default usuariosRouter
