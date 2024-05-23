import {
  selectAllQuery,
  selectByIdQuery,
  selectByParamsConditionQuery,
  selectByJoinConditionQuery,
  insertQuery,
  updateByIdQuery,
  deleteByIdQuery,
  selectByJoinConditionOrder,
  selectByJoinWhereConditionOrder
} from "../model/index.js"

const mensajesTabla = "mensajes"

export const getMensajes = async (req, res, next) => {
  try {
    const mensajes = await selectAllQuery(mensajesTabla)
    if (mensajes.length === 0)
      return res
              .status(404)
              .json({ message: "Mensajes not found" })
    res
      .status(200)
      .json(mensajes)
  } catch (error) {
    next(error)
  }
}

export const getMensajeById = async (req, res, next) => {
  try {
    const { id } = req.params

    const mensajesData = await selectByIdQuery(mensajesTabla, id)
    if (mensajesData.length === 0)
      return res
              .status(404)
              .json({ message: "Mensaje not found" })
    res
      .status(200)
      .json(mensajesData[0])
  } catch (error) {
    next(error)
  }
}

export const createMensaje = async (req, res, next) => {
  try {
    const { userId } = req
    const {
      contenido_mensaje,
      tema_id,
    } = req.body

    const mensajesData = {
      contenido_mensaje,
      usuario_id: userId,
      tema_id
    }

    const newMensaje = await insertQuery(mensajesTabla, mensajesData)
    res
      .status(201)
      .json(newMensaje)
  } catch (error) {
    next(error)
  }
}

export const updateTema = async (req, res, next) => {
  try {
    const { id } = req.params
    let id_mensaje = parseInt(id)
    const {
      contenido_mensaje,
      usuario_id,
      tema_id
    } = req.body

    const foroData = {
      contenido_mensaje,
      usuario_id,
      tema_id
    }

    const putMensaje = await updateByIdQuery(mensajesTabla, foroData, id_mensaje)

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

    const delMensaje = await deleteByIdQuery(mensajesTabla, id)
    res
      .status(204)
      .json(delMensaje)
  } catch (error) {
    next(error)
  }
}

export const getMensajesByTema = async (req, res, next) => {
  try {
    const { id } = req.params
    const mensajesData = await selectByJoinWhereConditionOrder(
      mensajesTabla,
      "usuarios",
      ["contenido_mensaje", "usuario_id", "fechapub_mensaje", "nombre_usuario", "apellido_usuario"],
      "usuario_id = id_usuario",
      "tema_id = $1",
      "fechapub_mensaje",
      [id]
    )
    if (mensajesData.length === 0)
      return res
              .status(404)
              .json({ message: "Mensajes not found" })
    res
      .status(200)
      .json(mensajesData)
  } catch (error) {
    next(error)
  }
}
