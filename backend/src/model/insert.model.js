import { pool } from "./db.js"

export const insertQuery = async (tableName, data) => {
  const fields = Object.keys(data)
  const values = Object.values(data)

  const query = `
    INSERT INTO ${tableName} (${fields.join(', ')})
    VALUES (${values.map((_, index) => `$${index + 1}`).join(', ')})
    RETURNING *;`
  
  const result = await pool.query(query, values)
  return result.rows[0];
}
