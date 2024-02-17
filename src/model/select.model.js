import { pool } from "./db.js"

export const selectByIdQuery = async (tableName, id) => {
  // const fields = Object.keys(data)
  // const values = Object.values(data)
  const query = `
    SELECT * FROM ${tableName}
    WHERE id_${tableName} = $1`
  const result = await pool.query(query, id)
  return result.rows;
}

export const selectByParamsConditionQuery = async (tableName, columns, condition, values) => {
  const query = `
    SELECT ${columns.join(', ')}
    FROM ${tableName}
    WHERE ${condition}`
  const result = await pool.query(query, values)
  return result.rows;
}
