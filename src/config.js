export const db = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
}

export const apiHost = process.env.APISERVER_HOST
export const apiPort = process.env.APISERVER_PORT
export const secretjwt = process.env.SECRET_JWT
