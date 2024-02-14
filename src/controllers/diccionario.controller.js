import { pool } from "../db.js"
import { generateWordOnOpenAI } from "../gpt.js"

function identifySearchPattern(searchPattern) {
  // if (/^[a-zA-Z]$/.test(searchPattern)) {
  //   return true
  // }
  
  if (/^(?!.*(\w)\1)[a-zA-Z]+$/.test(searchPattern) 
    && searchPattern.length > 4) {
    return true
  } 
  
  else {
    return false
  }
  
}

async function getDataFromDB(searchPattern) {
  const palabra = await pool
    .query(`
      SELECT categoria, palabra, definicion
      FROM diccionarioeco
      WHERE palabra = $1 
      OR categoria =$1`, [searchPattern]
    )
    if (palabra.rows.length === 0)
      return { message: "Word not found" }
    return palabra.rows[0]
}

async function setDataOnDB(categoria, palabra, definicion) {
  const palabraNueva = await pool
    .query(
      `INSERT INTO diccionarioeco
      (categoria, palabra, definicion, usuario_id)
      VALUES($1, $2, $3, 2) RETURNING *`,
      [categoria, palabra, definicion]
    )

  return palabraNueva.rows[0]
}

export const generateWord = async (req, res, next) => {
  try {
    let palabra = {}
    let resultAI = {}
    const { search } = req.params
    //  Identificar si es una letra, una palabra o algo que no tenga mucho sentido
    let pattern = search.toLowerCase()
    if (identifySearchPattern(pattern)) {
       //     verificar que la palabra o patrón de búsqueda esté en la base de datos...  
      palabra = await getDataFromDB(pattern)
      if (palabra.message) {
        delete palabra.message
        resultAI = await generateWordOnOpenAI(pattern)
        palabra = JSON.parse(resultAI)
        if(!palabra.definicion) {
          res.status(400).json({
            error: "Incorrect word pattern!"
          })
        }
        else {
          //          sino consulta a gpt y guardar en la bd
          await setDataOnDB(palabra.categoria, palabra.palabra, palabra.definicion)
          res.json(palabra)
        }
      } else {
        //          si está traemos los datos de la bd...
        res.json(palabra)
      }
    }
  } catch (error) {
    next(error)
  }
}