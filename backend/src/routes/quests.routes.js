import { Router } from "express"
import {
  getQuests,
  getQuestByContentId,
  createQuest,
  updateQuest,
  deleteQuest,
  createAnswer
} from "../controllers/index.js"

const questsRouter = Router()

questsRouter.get("/quests", getQuests)

questsRouter.get("/quests/:id", getQuestByContentId)

questsRouter.post("/quests", createQuest)

questsRouter.put("/quests/:id", updateQuest)

questsRouter.delete("/quests/:id", deleteQuest)

questsRouter.post("/answers", createAnswer)

export default questsRouter
