import * as dotenv from 'dotenv';
import express from 'express';
import * as bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import stockController from './controller/stock.routes';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Stock API',
            version: '1.0.0',
            description: 'API for managing stock items',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./controller/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/stock', stockController);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});