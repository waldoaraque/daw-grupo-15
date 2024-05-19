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

export const selectByJoinConditionQuery = async (tableName, joinTable, columns, join_condition, where_condition, values) => {
  const query = `
    SELECT ${columns.join(', ')}
    FROM ${tableName}
    JOIN ${joinTable}
    ON ${join_condition}
    WHERE ${where_condition};`
  const result = await pool.query(query, values)
  return result.rows;
}

export const selectByJoinConditionOrder = async (tableName, joinTable, columns, join_condition, order_condition) => {
  const query = `
    SELECT ${columns.join(', ')}
    FROM ${tableName}
    JOIN ${joinTable}
    ON ${join_condition}
    ORDER BY ${order_condition} DESC;`
  const result = await pool.query(query)
  return result.rows;
}
