import express, {Request, Response} from 'express'
import db from './config/db'
import swaggerUi from 'swagger-ui-express'
import swaggerSpecs from './config/swagger'

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

//Route test
app.get('/api/test', (req: Request, res: Response) => {
    db.query('SELECT NOW() AS now', (err: any, result: any[]) => {
        if (err) {
            return res.status(500).json({ error: 'Erreur lors de la requête' });
        }
        res.json(result[0]);
    });
})

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`)
})