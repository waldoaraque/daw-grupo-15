import {
  selectAllQuery,
  selectByIdQuery,
  insertQuery,
  updateByIdQuery,
  deleteByIdQuery
} from "../model/index.js"
import fs from 'fs'

const contenidosTabla = "contenidos"

export const getContenidos = async (req, res, next) => {
  try {
    const contenidos = await selectAllQuery(contenidosTabla)
    if (contenidos.length === 0)
      return res
              .status(404)
              .json({ message: "Contents not found" })
    res
      .status(200)
      .json(contenidos)
  } catch (error) {
    next(error)
  }
}

export const getContenidoById = async (req, res, next) => {
  try {
    const { id } = req.params

    const contenidosData = await selectByIdQuery(contenidosTabla, id)
    if (contenidosData.length === 0)
      return res
              .status(404)
              .json({ message: "Content not found" })
    res
      .status(200)
      .json(contenidosData[0])
  } catch (error) {
    next(error)
  }
}

export const createContenido = async (req, res, next) => {
  try {
    const { userId, userRol, file } = req
    if (userRol !== 'educador') {
      return res
            .status(403)
            .json({ message: "Forbidden" })
    }
    const {
      titulo_contenido, 
      descripcion_contenido
    } = req.body
    
    // validar files ...
    //const imagenBin = fs.readFileSync(files.imagen[0].path)
    const videoBin = fs.readFileSync(file.path)

    const contenidosData = {
      titulo_contenido,
      usuario_id: userId,
      descripcion_contenido,
      imagen_contenido: null,
      video_contenido: videoBin
    }

    const newContenido = await insertQuery(contenidosTabla, contenidosData)
    
    // Eliminar archivos temporales
    // fs.unlinkSync(file.imagen[0].path)
    fs.unlinkSync(file.path)

    res
      .status(201)
      .json(newContenido)
    
  } catch (error) {
    next(error)
  }
}

export const updateContenido = async (req, res, next) => {
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

    const contenidosData = {
      titulo_tema,
      usuario_id: userId,
      foro_id: 3,
      descripcion_tema
    }

    const putContenido = await updateByIdQuery(contenidosTabla, contenidosData, id_tema)
    res
      .status(200)
      .json(putContenido)
  } catch (error) {
    next(error)
  }
}

export const deleteContenido = async (req, res, next) => {
  try {
    const { userId, userRol } = req
    const { id } = req.params

    if (userRol !== 'educador') {
      return res
            .status(403)
            .json({ message: "Forbidden" })
    }
    const contenidosData = await selectByIdQuery(contenidosTabla, id)

    if (userId !== contenidosData[0].usuario_id) {
      return res
              .status(403)
              .json({ message: "Forbidden" })
    }
    const delContenido = await deleteByIdQuery(contenidosTabla, id)
    res
      .status(204)
      .json(delContenido)
  } catch (error) {
    next(error)
  }
}
