import { pool } from "./db.js"

export const deleteByIdQuery = async (tableName, id) => {
  const idField = `id_${tableName}` 
  const query = `
    DELETE FROM ${tableName}
    WHERE ${idField} = $1
    RETURNING *;`
  const result = await pool.query(query, id)
  return result.rows;
}
