import { 
  insertQuery,
  selectByIdQuery,
  selectByParamsConditionQuery
} from "../model/index.js"
import { generateWordOnOpenAI } from "../openai/gpt.js"

const dicTabla = 'diccionarioeco'

const identifySearchPattern = (searchPattern) => {
  // if (/^[a-zA-Z]$/.test(searchPattern)) {
  //   return true
  // }
  
  if (/^(?!.*(\w)\1)[a-zA-Z]+$/.test(searchPattern)) {
    return true
  }
  
  else {
    return false
  }
}

const getDataFromDB = async (searchPattern) => {
  let resSelectpalabra = await selectByParamsConditionQuery(
    dicTabla,
    ['categoria', 'palabra', 'definicion'],
    'palabra = $1 OR categoria = $1',
    [searchPattern]
  )
  if (resSelectpalabra.length === 0) {
    return []
  } 
  else if (resSelectpalabra.length === 1) {
    return resSelectpalabra[0]
  } 
  else {
    return resSelectpalabra
  }
}

const setDataOnDB = async (usuario_id, categoria, palabra, definicion) => {
  const dicData = {
    categoria,
    palabra,
    definicion,
    usuario_id
  }
  let resInsertPalabra = await insertQuery(dicTabla, dicData)
  return resInsertPalabra
}

export const generateWord = async (req, res, next) => {
  try {
    const userId = req.userId
    //console.log(userId)
    let palabra = {}
    let resultAI = {}
    const { search } = req.params
    //  Identificar si es una letra, una palabra o algo que no tenga mucho sentido
    let pattern = search.toLowerCase()
    if (identifySearchPattern(pattern) && pattern.length > 4) {
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
          await setDataOnDB(userId, palabra.categoria, palabra.palabra, palabra.definicion)
          res.status(201).json(palabra)
        }
      } else {
        // si está traemos los datos de la bd...
        res.status(200).json(palabra)
      }
    } else if (identifySearchPattern(pattern) && pattern.length == 1) {
      palabra = await getDataFromDB(pattern.toUpperCase())
      //console.log(palabra)
      res.status(200).json(palabra)
    }
    // mandar error 
  } catch (error) {
    next(error)
  }
}
