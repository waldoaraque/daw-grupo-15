import express from "express"
import cors from "cors"
import morgan from "morgan"
import { verifyToken } from "./middleware/index.js"
import {
  loginRouter,
  signupRouter,
  usuariosRouter,
  diccionarioRouter,
  escuelasRouter,
  foroRouter,
  temasRouter,
  mensajesRouter,
  ptsRouter,
  contenidosRouter,
  questsRouter
} from "./routes/index.js"
import { apiHost, apiPort } from "./config.js"

const app = express()

// Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", loginRouter)
app.use("/api", signupRouter)

// Middleware Auth
app.use(verifyToken)

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API" })
})

// Services
app.use("/api", usuariosRouter)
app.use("/api", escuelasRouter)
app.use("/api", diccionarioRouter)
app.use("/api", foroRouter)
app.use("/api", temasRouter)
app.use("/api", mensajesRouter)
app.use("/api", ptsRouter)
app.use("/api", contenidosRouter)
app.use("/api", questsRouter)

const server = app.listen(apiPort, () => {
  console.log(`API Server running in: ${apiHost}:${apiPort}`)
})

export default server
