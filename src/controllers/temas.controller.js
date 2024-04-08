import {
  selectAllQuery,
  selectByIdQuery,
  insertQuery,
  updateByIdQuery,
  deleteByIdQuery
} from "../model/index.js"

const temasTabla = 'temas'

export const getTemas = async (req, res, next) => {
  try {
    const temas = await selectAllQuery(temasTabla)
    if (temas.length === 0)
      return res
              .status(404)
              .json({ message: "Temas not found" })
    res
      .status(200)
      .json(temas)
  } catch (error) {
    next(error)
  }
}

export const getTemaById = async (req, res, next) => {
  try {
    const { id } = req.params

    const temasData = await selectByIdQuery(temasTabla, id)
    if (temasData.length === 0)
      return res
              .status(404)
              .json({ message: "Tema not found" })
    res
      .status(200)
      .json(temasData[0])
  } catch (error) {
    next(error)
  }
}

export const createTema = async (req, res, next) => {
  try {
    const {
      titulo_tema,
      usuario_id,
      foro_id,
      descripcion_tema
    } = req.body

    const temasData = {
      titulo_tema,
      usuario_id,
      foro_id,
      descripcion_tema
    }

    const newTema = await insertQuery(temasTabla, temasData)
    res
      .status(201)
      .json(newTema)
  } catch (error) {
    next(error)
  }
}

export const updateTema = async (req, res, next) => {
  try {
    const { id } = req.params
    let id_tema = parseInt(id)
    const {
      titulo_tema,
      usuario_id,
      foro_id,
      descripcion_tema
    } = req.body

    const foroData = {
      titulo_tema,
      usuario_id,
      foro_id,
      descripcion_tema
    }

    const putTema = await updateByIdQuery(temasTabla, foroData, id_tema)

    res
      .status(200)
      .json(putTema)
  } catch (error) {
    next(error)
  }
}

export const deleteTema = async (req, res, next) => {
  try {
    const { id } = req.params

    const delTema = await deleteByIdQuery(temasTabla, id)
    res
      .status(204)
      .json(delTema)
  } catch (error) {
    next(error)
  }
}
