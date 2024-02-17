import { 
  insertQuery,
  selectByIdQuery,
  selectByParamsConditionQuery
} from "../model/index.js"
import { generateWordOnOpenAI } from "../openai/gpt.js"

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
  let resSelectpalabra = await selectByParamsConditionQuery(
    'diccionarioeco',
    ['categoria', 'palabra', 'definicion'],
    'palabra = $1 OR categoria = $1',
    [searchPattern]
  )
  if (resSelectpalabra.length === 0)
    return { message: "Word not found" }
  return resSelectpalabra[0]
}

async function setDataOnDB(categoria, palabra, definicion) {
  const dicData = {
    categoria,
    palabra,
    definicion,
    usuario_id
  }
  let resInsertPalabra = await insertQuery('diccionarioeco', dicData)
  return resInsertPalabra
}

export const generateWord = async (req, res, next) => {
  try {
    let palabra = {}
    let resultAI = {}
    const { search } = req.params
    //  Identificar si es una letra, una palabra o algo que no tenga mucho sentido
    let pattern = search.toLowerCase()
    if (identifySearchPattern(pattern)) {
       // verificar que la palabra o patrón de búsqueda esté en la base de datos...  
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
          // sino consulta a gpt y guardar en la bd
          await setDataOnDB(palabra.categoria, palabra.palabra, palabra.definicion)
          res.status(201).json(palabra)
        }
      } else {
        // si está traemos los datos de la bd...
        res.status(200).json(palabra)
      }
    }
  } catch (error) {
    next(error)
  }
}
