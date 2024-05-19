import {
  selectByJoinConditionOrder,
} from "../model/index.js"

const puntuacionesTabla = "puntuaciones"

export const getPuntuacionesData = async (req, res, next) => {
  try {
    //const { id } = req.params
    const puntuacionesData = await selectByJoinConditionOrder(
      `${puntuacionesTabla} p`,
      "usuarios u",
      ["p.*", "u.nombre_usuario", "u.apellido_usuario", "u.email"],
      "p.usuario_id = u.id_usuario",
      "p.total_pts"
    )
    if (puntuacionesData.length === 0)
      return res
              .status(404)
              .json({ message: "Mensajes not found" })
    res
      .status(200)
      .json(puntuacionesData)
  } catch (error) {
    next(error)
  }
}