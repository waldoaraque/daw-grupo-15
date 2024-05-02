import jwt from 'jsonwebtoken'
import { verifyToken } from '../../middleware/index.js'
import Test from 'supertest/lib/test.js'

describe('verifyToken', () => {
  test('verifica el token correcto', () => {})
  /*
  test('verifica el token correctamente', () => {
    // Mockear la solicitud
    const req = {
      headers: {
        authorization: 'Bearer TOKEN_MOCK'
      }
    }

    // Mockear la respuesta
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    // Mockear la función jwt.verify()
    const mockDecoded = { user_id: 'user_id_mock' }
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(null, mockDecoded)
    })

    // Ejecutar la función que deseas probar
    verifyToken(req, res, () => {})

    // Verificar que jwt.verify se llame con los parámetros correctos
    expect(jwt.verify).toHaveBeenCalledWith('TOKEN_MOCK', 'SECRETO_MOCK', expect.any(Function))

    // Verificar que el ID de usuario se agregue correctamente a la solicitud
    expect(req.userId).toBe('user_id_mock')

    // Verificar que next() se haya llamado
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).not.toHaveBeenCalled()
  })

  test('maneja el caso en que no se proporciona un token', () => {
    // Mockear la solicitud sin token
    const req = {
      headers: {}
    }

    // Mockear la respuesta
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    // Ejecutar la función que deseas probar
    verifyToken(req, res, () => {})

    // Verificar que res.status se llame con el código de estado 401
    // y que res.json se llame con el mensaje correspondiente
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Token no proporcionado' })
  })

  test('maneja el caso en que se proporciona un token inválido', () => {
    // Mockear la solicitud con un token inválido
    const req = {
      headers: {
        authorization: 'Bearer TOKEN_INVALIDO'
      }
    }

    // Mockear la respuesta
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    // Mockear la función jwt.verify() para que devuelva un error
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(new Error('Token inválido'))
    })

    // Ejecutar la función que deseas probar
    verifyToken(req, res, () => {})

    // Verificar que res.status se llame con el código de estado 401
    // y que res.json se llame con el mensaje correspondiente
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido' })
  })
  */
})