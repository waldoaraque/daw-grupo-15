import supertest from "supertest"
import { usuariosRouter } from "../../routes/index.js"
import { usuariosTestData, usuarioData, setUserProps } from "../../__mocks__/usuarios.mock.js"
import express from "express"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', usuariosRouter)

describe('Tests Controlador Usuarios', () => {
  test('GET /api/usuarios devuelve una lista de usuarios', async () => {
    const response = await supertest(app).get('/api/usuarios')
    // Verifica el código de estado
    expect(response.status).toBe(200)
    // Verifica que la respuesta sea un array
    expect(Array.isArray(response.body)).toBe(true)
    // Verifica la estructura de los usuarios en la respuesta si es necesario
    expect(response.body.length && usuariosTestData.length).toBeGreaterThan(0)

    // Verifica los campos de los usuarios
    const receivedUsers = response.body
    const expectedUsers = usuariosTestData
    receivedUsers.forEach(user => {
      const expectedUser = expectedUsers.find(expectedUser => expectedUser.id_usuario === user.id_usuario)
      if (expectedUser) {
        const result = setUserProps(expectedUser, user)
        expect(user).toEqual(result)
      }
    })
  })

  test('GET /api/usuarios/4 devuelve ok si consigue el usuario especificado', async () => {
    const response = await supertest(app).get(`/api/usuarios/4`)

    // Verifica el código de estado
    expect(response.status).toBe(200)

    const result = setUserProps(usuarioData, response.body)
    // Verifica el usuario de respuesta con el mock
    expect(response.body).toEqual(result)
  })

  test('POST /api/usuarios crea un nuevo usuario con éxito', async () => {

    const response = await supertest(app)
      .post('/api/usuarios')
      .send(usuarioData)

    // Verifica el código de estado
    expect(response.status).toBe(201)

    // Asignamos el id creado
    const newUser = {
      ...usuarioData
    }
    newUser.id_usuario = response.body.id_usuario
    newUser.contrasena = response.body.contrasena

    if (response.body.foto_usuario != null) {
      newUser.foto_usuario = response.body.foto_usuario
    }

    // Verifica que la respuesta contenga el nuevo usuario creado
    expect(response.body).toEqual(newUser)
  })

  test('PUT /api/usuarios/2 actualiza un usuario con éxito', async () => {
    const response = await supertest(app)
      .put('/api/usuarios/2')
      .send(usuarioData)

    // Verifica el código de estado
    expect(response.status).toBe(200)

    
    // Asignamos el id creado
    const putUser = {
      ...usuarioData
    }
    putUser.id_usuario = response.body.id_usuario
    putUser.contrasena = response.body.contrasena

    if (response.body.foto_usuario != null) {
      putUser.foto_usuario = response.body.foto_usuario
    }

    // Verifica que la respuesta contenga el nuevo usuario creado
    expect(response.body).toEqual(putUser)
  })

  test('DELETE /api/usuarios/ elimina el ulitmo usuario de la lista con éxito', async () => {
    const resUsuarios = await supertest(app).get('/api/usuarios')
    const id_delete = resUsuarios.body[resUsuarios.body.length -2].id_usuario
    const response = await supertest(app)
      .delete(`/api/usuarios/${id_delete}`)

    // Verifica el código de estado
    expect(response.status).toBe(204)

  })
})
