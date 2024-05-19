import pg from "pg"
import { db } from "../config.js"

export const pool = new pg.Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database,
})

try {
  pool.on("connect", () => console.log("DB connected!"))  
} catch (error) {
  console.error(`Error connection on DB, ${error}`)
}
