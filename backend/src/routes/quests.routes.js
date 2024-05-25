import { Router } from "express"
import {
  getQuests,
  getQuestById,
  createQuest,
  updateQuest,
  deleteQuest
} from "../controllers/index.js"

const questsRouter = Router()

questsRouter.get("/quests", getQuests)

questsRouter.get("/quests/:id", getQuestById)

questsRouter.post("/quests", createQuest)

questsRouter.put("/quests/:id", updateQuest)

questsRouter.delete("/quests/:id", deleteQuest)

export default questsRouter
