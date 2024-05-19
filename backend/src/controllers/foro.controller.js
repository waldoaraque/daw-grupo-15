import {
  selectAllQuery,
  selectByIdQuery,
  insertQuery,
  updateByIdQuery,
  deleteByIdQuery
} from "../model/index.js"

const foroTabla = "foro"

export const getForos = async (req, res, next) => {
  try {
    const foros = await selectAllQuery(foroTabla)
    if (foros.length === 0)
      return res
              .status(404)
              .json({ message: "Foros not found" })
    res
      .status(200)
      .json(foros)
  } catch (error) {
    next(error)
  }
}

export const getForoById = async (req, res, next) => {
  try {
    const { id } = req.params

    const foroData = await selectByIdQuery(foroTabla, id)
    if (foroData.length === 0)
      return res
              .status(404)
              .json({ message: "Foro not found" })
    res
      .status(200)
      .json(foroData[0])
  } catch (error) {
    next(error)
  }
}

export const createForo = async (req, res, next) => {
  try {
    const { userId, userRol } = req
    if (userRol !== "educador" || userRol !== "director") {
      return res
                .status(403)
                .json({ message: "Forbidden" })
    }
    const {
      titulo_foro,
      descripcion_foro
    } = req.body

    const foroData = {
      titulo_foro,
      userId,
      descripcion_foro
    }

    const newForo = await insertQuery(foroTabla, foroData)
    res
      .status(201)
      .json(newForo)
  } catch (error) {
    next(error)
  }
}

export const updateForo = async (req, res, next) => {
  try {
    const { userId, userRol } = req
    if (userRol !== "educador" || userRol !== "director") {
      return res
                .status(403)
                .json({ message: "Forbidden" })
    }
    const { id } = req.params
    let id_foro = parseInt(id)
    const {
      titulo_foro,
      descripcion_foro
    } = req.body

    const foroData = {
      titulo_foro,
      userId,
      descripcion_foro
    }

    const putForo = await updateByIdQuery(foroTabla, foroData, id_foro)

    res
      .status(200)
      .json(putForo)
  } catch (error) {
    next(error)
  }
}

export const deleteForo = async (req, res, next) => {
  try {
    const { userId, userRol } = req
    if (userRol !== "educador" || userRol !== "director") {
      return res
                .status(403)
                .json({ message: "Forbidden" })
    }
    const { id } = req.params

    const delForo = await deleteByIdQuery(foroTabla, id)
    res
      .status(204)
      .json(delForo)
  } catch (error) {
    next(error)
  }
}
