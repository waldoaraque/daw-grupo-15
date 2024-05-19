import { Router } from "express"
import {
  signup
} from "../controllers/index.js"

const signupRouter = Router()

signupRouter.post("/signup", signup)

export default signupRouter