import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config()

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
})

db.connect((err) => {
    if(err) {
        console.error('Erreur de connexion à la base de données:', err)
    } else {
        console.log('Connecté à la base de données MySQL')
    }

})

export default db