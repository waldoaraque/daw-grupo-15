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
  temasRouter
} from "./routes/index.js"
import { port } from "./config.js"

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

const server = app.listen(port, () => {
  console.log(`Server on port ${port}`)  
})

export default server
