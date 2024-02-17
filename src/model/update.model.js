import { pool } from "./db.js"

export const updateByIdQuery = async (tableName, data, id) => {
  const fields = Object.keys(data)
  const values = Object.values(data)
  const idField = `id_${tableName.slice(0, -1)}`
  const query = `
    UPDATE ${tableName} 
    SET ${
      fields.map((field, index) => `${field} = $${index + 1}`)
        .join(', ')
    }
    WHERE ${idField} = $${fields.length + 1}
    RETURNING *;`
  const result = await pool.query(query, [...values, id])
  return result.rows[0]
}
