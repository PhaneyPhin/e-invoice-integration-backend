import dotenv from 'dotenv'

if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.testing'})
} else {
    dotenv.config()
}

export const DB_HOST = process.env.DB_HOST as string
export const DB_NAME = process.env.DB_NAME as string
export const DB_USERNAME = process.env.DB_USERNAME as string
export const DB_PASSWORD = process.env.DB_PASSWORD as string
export const DB_PORT = parseInt(process.env.DB_PORT || '5432', 10)
export const PORT = process.env.PORT || 3000
export const JWT_SECRET = process.env.JWT_SECRET as string
export const JWT_EXPIRE_IN = '1h'

export const INVOICE_API_URL = process.env.INVOICE_API_URL as string
export const CLIENT_ID = process.env.CLIENT_ID as string
export const SECRET_KEY = process.env.SECRET_KEY as string