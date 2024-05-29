import { login } from "./login.controller.js"
import { signup } from "./signup.controller.js"
import { 
  getUsuarios,
  getUsuarioById, 
  createUsuario,
  updateUsuario,
  deleteUsuario
} from "./usuarios.controller.js"

import {
  getEscuelas,
  getEscuelaById, 
  createEscuela,
  updateEscuela,
  deleteEscuela
} from "./escuelas.controller.js"

import {
  getForos,
  getForoById, 
  createForo,
  updateForo,
  deleteForo
} from "./foro.controller.js"

import {
  getTemas,
  getTemaById, 
  createTema,
  updateTema,
  deleteTema
} from "./temas.controller.js"

import { 
  generateWord
} from "./diccionario.controller.js"

import {
  getMensajesByTema,
  createMensaje
} from "./mensajes.controller.js"

import {
  getPuntuacionesData
} from "./ranking.controller.js"

import {
  getContenidoById,
  getContenidos,
  createContenido,
  updateContenido,
  deleteContenido
} from "./contenidos.controller.js"

import {
  getQuests,
  getQuestByContentId,
  createQuest,
  updateQuest,
  deleteQuest,
  createAnswer
} from "./quests.controller.js"

export {
  login,
  signup,
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  getEscuelas,
  getEscuelaById, 
  createEscuela,
  updateEscuela,
  deleteEscuela,
  getForos,
  getForoById, 
  createForo,
  updateForo,
  deleteForo,
  getTemas,
  getTemaById, 
  createTema,
  updateTema,
  deleteTema,
  generateWord,
  getMensajesByTema,
  createMensaje,
  getPuntuacionesData,
  getContenidos,
  getContenidoById,
  createContenido,
  updateContenido,
  deleteContenido,
  getQuests,
  getQuestByContentId,
  createAnswer,
  createQuest,
  updateQuest,
  deleteQuest
}
