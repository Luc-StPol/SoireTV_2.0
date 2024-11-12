import express, {Express, NextFunction, Request, Response} from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerSpecs from './config/swagger/swagger'
import userRoutes from './routes/users'
import  { MysqlError } from 'mysql';
import mysql from 'mysql2'
import 'dotenv/config'
import cors from 'cors'

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

app.use(cors())

//Conection to db
app.use((req:Request, res: Response, next: NextFunction) => {
    req.db = pool
    next()
})


app.use('/api/testdb', (req: Request, res: Response, next: NextFunction) => {
    const query = 'SELECT test FROM testdb'
    req.db.query(query, (err: MysqlError | null, results: any) => {
        if(err){
            res.status(500).json({
                message: 'Connexion échoué',
                error: err.message,
                errno: err.errno,
            })
            console.log(err.message)
            return
        }
        res.status(201).json(results)
    })
})

//Routes
app.use('/api/auth', userRoutes)

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`)
    console.log(`Documention de l'api disponible sur http://localhost:${PORT}/api-docs`)
})