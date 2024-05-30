import { insertQuery, selectByParamsConditionQuery } from "../model/index.js"
import { generateWordOnOpenAI } from "../openai/gpt.js"

const dicTabla = "diccionarioeco"

const identifySearchPattern = (searchPattern) => /^[a-z]+$/.test(searchPattern)

const getDataFromDB = async (searchPattern) => {
  const resSelectpalabra = await selectByParamsConditionQuery(
    dicTabla,
    ["categoria", "palabra", "definicion"],
    "palabra = $1",
    [searchPattern]
  )
  if (resSelectpalabra.length === 0) {
    return []
  } else if (resSelectpalabra.length === 1) {
    return resSelectpalabra[0]
  } else {
    return resSelectpalabra
  }
}

const setDataOnDB = async (usuario_id, categoria, palabra, definicion) => {
  const dicData = { categoria, palabra, definicion, usuario_id }
  const resInsertPalabra = await insertQuery(dicTabla, dicData)
  return resInsertPalabra
}

const handleDatabaseResponse = (res, palabra) => {
  if (!Array.isArray(palabra) || palabra.length === 0) {
    res.status(400).json({ error: "Incorrect word pattern!" })
  } else {
    res.status(200).json(palabra)
  }
}

export const generateWord = async (req, res, next) => {
  try {
    const { userId } = req
    const { search } = req.params
    const pattern = search.toLowerCase()

    let palabra = {}
    if (identifySearchPattern(pattern) && !pattern.length < 4) {
      palabra = await getDataFromDB(pattern)
      if (!palabra.length) {
        const resultAI = await generateWordOnOpenAI(pattern)
        palabra = JSON.parse(resultAI)
        if (!palabra.definicion) {
          return res.status(400).json({ error: "Incorrect word pattern!" })
        }
        await setDataOnDB(userId, palabra.categoria, palabra.palabra, palabra.definicion)
        return res.status(201).json(palabra)
      }
    } else if (identifySearchPattern(pattern) && pattern.length === 1) {
      palabra = await getDataFromDB(pattern.toUpperCase())
    }
    handleDatabaseResponse(res, palabra)
  } catch (error) {
    next(error)
  }
}

export const getCategoriesWords = async (req, res, next) => {
  try {
    const { category } = req.params

    const resSelectpalabra = await selectByParamsConditionQuery(
      dicTabla,
      ["categoria", "palabra", "definicion"],
      "categoria = $1",
      [category]
    )
    res
      .status(200)
      .json(resSelectpalabra)
  } catch (error) {
    next(error)
  }
}