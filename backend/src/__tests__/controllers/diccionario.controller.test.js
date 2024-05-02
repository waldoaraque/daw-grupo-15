import supertest from "supertest"
import { diccionarioRouter } from "../../routes/index.js"
import express from "express"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', diccionarioRouter)

describe('Tests Controlador Diccionario', () => {
  test('GET /api/palabras devuelve una lista de usuarios', async () => {
    
  })

  test('GET /api/palabras/4 devuelve ok si consigue el usuario especificado', async () => {
    
  })

})