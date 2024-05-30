import {
  selectAllQuery,
  selectByIdQuery,
  selectByParamsConditionQuery,
  insertQuery,
  updateByIdQuery,
  deleteByIdQuery
} from "../model/index.js"

const questsTabla = "quests"

export const getQuests = async (req, res, next) => {
  try {
    const quests = await selectAllQuery(questsTabla)
    if (quests.length === 0)
      return res
              .status(404)
              .json({ message: "Quests not found" })
    res
      .status(200)
      .json(quests)
  } catch (error) {
    next(error)
  }
}

export const getQuestByContentId = async (req, res, next) => {
  try {
    const { userId, userRol } = req
    const { id } = req.params
    const quests = await selectByParamsConditionQuery(
      questsTabla,
      ['id_quest','pregunta'],
      'contenido_id = $1',
      [id]
    )
    if (quests.length === 0)
      return res
              .status(404)
              .json({ message: "Quests not found" })
    res
      .status(200)
      .json(quests)
  } catch (error) {
    next(error)
  }
}

export const createQuest = async (req, res, next) => {
  try {
    const { userId, userRol } = req
    if (userRol !== 'educador') {
      return res
            .status(403)
            .json({ message: "Forbidden" })
    }
    const {
      contenido_id,
      pregunta
    } = req.body

    const questsData = {
      usuario_id: userId,
      contenido_id,
      pregunta
    }

    const newQuest = await insertQuery(questsTabla, questsData)
    res
      .status(201)
      .json(newQuest)
  } catch (error) {
    next(error)
  }
}

export const updateQuest = async (req, res, next) => {
  try {
    const { userId, userRol } = req
    const { id } = req.params
    const id_quest = parseInt(id)
    if (userRol !== 'educador') {
      return res
            .status(403)
            .json({ message: "Forbidden" })
    }
    const {
      pregunta,
      contenido_id
    } = req.body

    const questsData = {
      usuario_id: userId,
      contenido_id,
      pregunta
    }
    const putQuest = await updateByIdQuery(questsTabla, questsData, id_quest)
    res
      .status(200)
      .json(putQuest)
  } catch (error) {
    next(error)
  }
}

export const deleteQuest = async (req, res, next) => {
  try {
    const { userId, userRol } = req

    if (userRol !== 'educador') {
      return res
            .status(403)
            .json({ message: "Forbidden" })
    }
    const { id } = req.params
    const questsData = await selectByIdQuery(questsTabla, id)

    if (userId !== questsData[0].usuario_id) {
      return res
              .status(403)
              .json({ message: "Forbidden" })
    }
    const delQuest = await deleteByIdQuery(questsTabla, id)
    res
      .status(204)
      .json(delQuest)
  } catch (error) {
    next(error)
  }
}

export const createAnswer = async (req, res, next) => {
  try {
    const { userId, userRol } = req
    if (userRol !== 'estudiante') {
      return res
            .status(403)
            .json({ message: "Forbidden" })
    }
    const {
      quest_id,
      respuesta
    } = req.body

    const questsData = {
      usuario_id: userId,
      quest_id,
      respuesta
    }

    const newAnswer = await insertQuery("respuestas_quest", questsData)
    res
      .status(201)
      .json(newAnswer)
  } catch (error) {
    next(error)
  }
}
