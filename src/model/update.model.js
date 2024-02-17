import { pool } from "./db.js"

export const updateByIdQuery = async (tableName, data) => {
  const fields = Object.keys(data)
  const values = Object.values(data)
  const idField = `id_${tableName}`
  const query = `
    UPDATE ${tableName} 
    SET (${
      fields.map((field, index) => `${field} = $${index + 1}`)
        .join(', ')
    })
    WHERE ${idField} = $${fields.indexOf(idField) + 1}
    RETURNING *;`
  
  const result = await pool.query(query, values)
  return result.rows[0];
}
