import bcrypt from "bcrypt"
import {
  selectAllQuery,
  selectByIdQuery,
  insertQuery,
  updateByIdQuery,
  deleteByIdQuery
} from "../model/index.js"

const usuarioTabla = "usuarios"

export const getUsuarios = async (req, res, next) => {
  try {
    const {userId, userRol } = req
    if (userRol !== "director") {
      res
      .status(403)
      .json({ message: "Forbidden" })
    }
    const usuarios = await selectAllQuery(usuarioTabla)
    if (usuarios.length === 0)
      return res
              .status(404)
              .json({ message: "Users not found" })
    res
      .status(200)
      .json(usuarios)
  } catch (error) {
    next(error)
  }
}

export const getUsuarioById = async (req, res, next) => {
  try {
    const { id } = req.params

    const usuarioData = await selectByIdQuery(usuarioTabla, id)
    if (usuarioData.length === 0)
      return res
              .status(404)
              .json({ message: "User not found" })
    res
      .status(200)
      .json(usuarioData[0])
  } catch (error) {
    next(error)
  }
}

export const createUsuario = async (req, res, next) => {
  try {
    const {userId, userRol } = req
    if (userRol !== "director") {
      return res
      .status(403)
      .json({ message: "Forbidden" })
    }
    const {
      nombre_usuario,
      apellido_usuario,
      email,
      contrasena,
      tipo_usuario,
      escuela_id,
      foto_usuario
    } = req.body

    const hashedPassword = await bcrypt.hash(contrasena, 10)

    const userData = {
      nombre_usuario,
      apellido_usuario,
      email,
      contrasena: hashedPassword,
      tipo_usuario,
      escuela_id,
      foto_usuario
    }

    const newUsuario = await insertQuery(usuarioTabla, userData)
    res
      .status(201)
      .json(newUsuario)
  } catch (error) {
    next(error)
  }
}

export const updateUsuario = async (req, res, next) => {
  try {
    const { id } = req.params
    let id_usuario = parseInt(id)
    const {
      nombre_usuario,
      apellido_usuario,
      email,
      contrasena,
      tipo_usuario,
      escuela_id,
      foto_usuario
    } = req.body

    const hashedPassword = await bcrypt.hash(contrasena, 10)

    const userData = {
      nombre_usuario,
      apellido_usuario,
      email,
      contrasena: hashedPassword,
      tipo_usuario,
      escuela_id,
      foto_usuario
    }

    const putUsuario = await updateByIdQuery(usuarioTabla, userData, id_usuario)

    res
      .status(200)
      .json(putUsuario)
  } catch (error) {
    next(error)
  }
}

export const deleteUsuario = async (req, res, next) => {
  try {
    const {userId, userRol } = req
    if (userRol !== "director") {
      res
      .status(403)
      .json({ message: "Forbidden" })
    }
    const { id } = req.params
    const delUsuario = await deleteByIdQuery(usuarioTabla, id)
    res
      .status(204)
      .json(delUsuario)
  } catch (error) {
    next(error)
  }
}
