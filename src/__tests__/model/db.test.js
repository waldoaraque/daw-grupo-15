import { pool } from "../../model/db.js"
import { db } from "../../config.js"

test('Tests Modelo Conexión a Base de Datos', async () => {
  expect(pool).toBeDefined()

  expect(pool.options).toMatchObject({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database,
  })
})
