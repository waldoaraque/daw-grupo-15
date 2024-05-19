import {
  selectAllQuery,
  selectByIdQuery,
  insertQuery,
  updateByIdQuery,
  deleteByIdQuery
} from "../model/index.js"

const escuelaTabla = "escuelas"

export const getEscuelas = async (req, res, next) => {
  try {
    const escuelas = await selectAllQuery(escuelaTabla)
    if (escuelas.length === 0)
      return res
              .status(404)
              .json({ message: "Schools not found" })
    res
      .status(200)
      .json(escuelas)
  } catch (error) {
    next(error)
  }
}

export const getEscuelaById = async (req, res, next) => {
  try {
    const { id } = req.params

    const escuelaData = await selectByIdQuery(escuelaTabla, id)
    if (escuelaData.length === 0)
      return res
              .status(404)
              .json({ message: "School not found" })
    res
      .status(200)
      .json(escuelaData[0])
  } catch (error) {
    next(error)
  }
}

export const createEscuela = async (req, res, next) => {
  try {
    const {
      nombre_escuela,
      ubicacion
    } = req.body

    const escuelaData = {
      nombre_escuela,
      ubicacion
    }

    const newEscuela = await insertQuery(escuelaTabla, escuelaData)
    res
      .status(201)
      .json(newEscuela)
  } catch (error) {
    next(error)
  }
}

export const updateEscuela = async (req, res, next) => {
  try {
    const { id } = req.params
    let id_escuela = parseInt(id)
    const {
      nombre_escuela,
      ubicacion
    } = req.body

    const escuelaData = {
      nombre_escuela,
      ubicacion
    }

    const putEscuela = await updateByIdQuery(escuelaTabla, escuelaData, id_escuela)

    res
      .status(200)
      .json(putEscuela)
  } catch (error) {
    next(error)
  }
}

export const deleteEscuela = async (req, res, next) => {
  try {
    const { id } = req.params

    const delEscuela = await deleteByIdQuery(escuelaTabla, id)
    res
      .status(204)
      .json(delEscuela)
  } catch (error) {
    next(error)
  }
}
