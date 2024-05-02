import { pool } from "./db.js"

export const selectAllQuery = async (tableName) => {
  const query = `
    SELECT * FROM ${tableName};`
  const result = await pool.query(query)
  return result.rows;
}

export const selectByIdQuery = async (tableName, id) => {
  const idField = `id_${tableName.slice(0,-1)}`
  const query = `
    SELECT * FROM ${tableName}
    WHERE ${idField} = $1;`
  const result = await pool.query(query, [id])
  return result.rows;
}

export const selectByParamsConditionQuery = async (tableName, columns, condition, values) => {
  const query = `
    SELECT ${columns.join(', ')}
    FROM ${tableName}
    WHERE ${condition};`
  const result = await pool.query(query, values)
  return result.rows;
}
