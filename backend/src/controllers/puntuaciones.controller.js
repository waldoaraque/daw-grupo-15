import {
  selectAllQuery,
  selectByIdQuery,
  insertQuery,
  updateByIdQuery,
  deleteByIdQuery
} from "../model/index.js"

const puntuacionesTabla = "puntuaciones"

export const getPuntuaciones = async (req, res, next) => {
  try {
    const puntuaciones = await selectAllQuery(puntuacionesTabla)
    if (puntuaciones.length === 0)
      return res
              .status(404)
              .json({ message: "Puntuaciones not found" })
    res
      .status(200)
      .json(puntuaciones)
  } catch (error) {
    next(error)
  }
}

export const getPuntuacionesByUser = async (req, res, next) => {
  try {
    const { id } = req.params

    const puntuacionesData = await selectByIdQuery(puntuacionesTabla, id)
    if (puntuacionesData.length === 0)
      return res
              .status(404)
              .json({ message: "Puntuaciones not found" })
    res
      .status(200)
      .json(puntuacionesData[0])
  } catch (error) {
    next(error)
  }
}

export const createMensaje = async (req, res, next) => {
  try {
    const {
      usuario_id,
      tema_id,
      fechapub_mensaje // cuando el evento de creación se dispare ?
    } = req.body

    const puntuacionesData = {
      usuario_id,
      tema_id,
      fechapub_mensaje
    }

    const newMensaje = await insertQuery(puntuacionesTabla, puntuacionesData)
    res
      .status(201)
      .json(newMensaje)
  } catch (error) {
    next(error)
  }
}

export const updateTema = async (req, res, next) => {
  // esta función se utilizará recurrentemente, para actualizar los puntos de los usuarios
  // cada vez que hagan interacciones con las diferentes entidades 
  try {
    const { id } = req.params
    let id_mensaje = parseInt(id)
    const {
      contenido_mensaje,
      usuario_id,
      tema_id,
      fechapub_mensaje
    } = req.body

    const foroData = {
      contenido_mensaje,
      usuario_id,
      tema_id,
      fechapub_mensaje
    }

    const putMensaje = await updateByIdQuery(puntuacionesTabla, foroData, id_mensaje)

    res
      .status(200)
      .json(putMensaje)
  } catch (error) {
    next(error)
  }
}

export const deleteMensaje = async (req, res, next) => {
  try {
    const { id } = req.params

    const delMensaje = await deleteByIdQuery(puntuacionesTabla, id)
    res
      .status(204)
      .json(delMensaje)
  } catch (error) {
    next(error)
  }
}
