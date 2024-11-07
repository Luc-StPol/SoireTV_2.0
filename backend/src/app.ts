import express, {Express, NextFunction, Request, Response} from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpecs from './config/swagger'
import userRoutes from './routes/users'
import mysql from 'mysql';
import { Pool } from 'mysql'
interface DbRequest extends Request {
    db: Pool;  // Ajout de la propriété db à Request
  }

const pool: mysql.Pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
})

const app: Express = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

//Conection to db
app.use((req:Request, res: Response, next: NextFunction) => {
    req.db = pool
    next()
})



//Routes
app.use('/api/auth', userRoutes)

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`)
})