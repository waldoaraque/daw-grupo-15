import { pool } from "../db.js"

export const createUsuario = async (req, res, next) => {
  try {
    const { title, description } = req.body

    // const newTask = await pool.query(
    //   "INSERT INTO task (title, description) VALUES($1, $2) RETURNING *",
    //   [title, description]
    // );

    // res.json(newTask.rows[0]);
  } catch (error) {
    next(error)
  }
}

export const getUsuario = async (req, res, next) => {
  try {
    const { id } = req.params
    const usuario = await pool.query("SELECT * FROM usuarios WHERE id_usuario = $1", [id])
    if (usuario.rows.length === 0)
      return res.status(404).json({ message: "User not found" })
    res.json(usuario.rows[0])
  } catch (error) {
    next(error)
  }
}