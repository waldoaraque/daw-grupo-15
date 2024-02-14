export const db = {
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "x0x0x02024",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || "dbenvironeducationdev",
}

// export const openAI = process.env.OPENAI_API_KEY

export const promptAI = `Eres un diccionario ecologico, 
al que se le consultarán palabras de la A a la Z
esperando su significado en formato JSON: 
{'categoria': A...Z, 'palabra': ..., 'definicion': ...},
pero ten cuidado, si no recibes una palabra que tenga que ver 
con el tema medio ambiente o ecológico devuelve el mismo json
pero el campo 'definicion' vacío, y por último siempre 
definiciones en español, nunca en inglés, 
los campos del json siempre así como te los he definido.`

export const port = process.env.PORT || 4000
