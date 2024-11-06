import swaggerJSDoc from 'swagger-jsdoc'

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Soiree TV API',
            version:'1.0.0',
            description:"Documentation de l'API pour le projet Soiree TV"
        },
        servers: [
            {
                url:'http://localhost:4000',
            },
        ],
    },
    apis: ['./src/routes/*ts']
}

const swaggerSpecs = swaggerJSDoc(swaggerOptions)

export default swaggerSpecs