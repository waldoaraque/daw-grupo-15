import supertest from "supertest"
import { foroRouter } from "../../routes/index.js"
import express from "express"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', foroRouter)

describe('Tests Controlador Foro', () => {
  test('GET /api/foro devuelve una lista de foros', async () => {
    
  })

  test('GET /api/foro/4 devuelve ok si consigue el usuario especificado', async () => {
    
  })

  test('POST /api/foro crea un nuevo usuario con éxito', async () => {

  })

  test('PUT /api/foro/2 actualiza un usuario con éxito', async () => {
    
  })

  test('DELETE /api/foro/ elimina el ulitmo usuario de la lista con éxito', async () => {
    

  })

})