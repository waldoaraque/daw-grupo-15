import { pool } from "../../model/db.js"
import { selectAllQuery, selectByIdQuery, selectByParamsConditionQuery } from '../../model/index.js'
import { usuariosTestData } from "../../__mocks__/usuarios.mock.js"

describe('Tests Modelo Función SELECT', () => {

  test('selectAllQuery devuelve filas correctamente', async () => {
    // // Ejecuta la función que deseas probar
    // const result = await selectAllQuery('usuarios')

    // // Verifica que se haya llamado a pool.query con la consulta correcta
    // expect(pool.query).toHaveBeenCalledWith('SELECT * FROM usuarios;')

    // // Verifica que la función devuelve las filas esperadas
    // expect(result).toEqual(usuariosTestData)
  })
})
