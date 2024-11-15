import * as dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import userRouter from './controller/user.routes';

const app: Express = express();

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

//* JWT Secret
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error('JWT_SECRET is not defined. Please set it in your environment variables.');
}

//* Routes
app.use('/users', userRouter);

//* Swagger
const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Stockk API',
            version: '1.0.0',
        },
    },
    apis: ['*controller/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(bodyParser.json());

app.use('/stock', stockController);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});