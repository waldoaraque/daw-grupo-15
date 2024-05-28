import {
  selectAllQuery,
  selectByIdQuery,
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

export const getQuestById = async (req, res, next) => {
  try {
    const { id } = req.params

    const questsData = await selectByIdQuery(questsTabla, id)
    if (questsData.length === 0)
      return res
              .status(404)
              .json({ message: "Quests not found" })
    res
      .status(200)
      .json(questsData[0])
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
    let id_tema = parseInt(id)
    if (userRol !== 'educador') {
      return res
            .status(403)
            .json({ message: "Forbidden" })
    }
    const {
      titulo_tema,
      descripcion_tema
    } = req.body

    const questsData = {
      titulo_tema,
      usuario_id: userId,
      foro_id: 3,
      descripcion_tema
    }

    const putQuest = await updateByIdQuery(questsTabla, questsData, id_tema)

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
