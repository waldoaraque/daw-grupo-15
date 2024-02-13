import { pool } from "../db.js"
import { generateWordOnOpenAI } from "../gpt.js"

export const generateWord = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log(id)
    
    // const usuario = await pool.query("SELECT * FROM usuarios WHERE id_usuario = $1", [id])
    // if (usuario.rows.length === 0)
    //   return res.status(404).json({ message: "User not found" })
    // res.json(usuario.rows[0])
    res.json({ "word": word, "significado": data, "category": category })
  } catch (error) {
    next(error)
  }
}