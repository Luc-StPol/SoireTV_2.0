import swaggerJSDoc from 'swagger-jsdoc'
import swaggerDoc from './swaggerDoc.json'

const swaggerOptions = {
    definition: swaggerDoc,
    apis: ['./src/routes/*.ts'],
}

const swaggerSpecs = swaggerJSDoc(swaggerOptions)

export default swaggerSpecs