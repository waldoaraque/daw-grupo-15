import express from "express"
import cors from "cors"
import morgan from "morgan"
import { verifyToken } from "./middleware/index.js"
import {
  loginRouter,
  usuariosRouter,
  diccionarioRouter
} from "./routes/index.js"
import { port } from "./config.js"

const app = express()

// Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", loginRouter)

// Middleware Auth
app.use(verifyToken)

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my API" })
})

// Services
app.use("/api", usuariosRouter)
app.use("/api", diccionarioRouter)

app.listen(port)
console.log(`Server on port ${port}`)