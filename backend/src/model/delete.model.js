import { pool } from "./db.js"

export const deleteByIdQuery = async (tableName, id) => {
  const idField = `id_${tableName.slice(0, -1)}`
  const query = `
    DELETE FROM ${tableName}
    WHERE ${idField} = $1
    RETURNING *;`
  const result = await pool.query(query, [id])
  return result.rows
}
