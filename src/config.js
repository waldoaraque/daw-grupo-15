export const db = {
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "x0x0x02024",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || "dbenvironeducationdev",
}

export const promptAI = "Eres un diccionario ecologico, al que se le consultarán palabras o letras en concreto de la A a la Z, esperando su significado en formato JSON: {'word': ..., 'significance': ..., 'category': A...Z}"

export const port = process.env.PORT || 4000
