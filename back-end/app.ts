import * as dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';

import userRouter from './controller/user.routes';
import stockController from './controller/stock.routes';
import organisationController from './controller/organisation.routes';
import swaggerJsDoc from 'swagger-jsdoc';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

//* Middleware
app.use(cors({ origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

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
app.use('/stock', stockController);
app.use('/organisations', organisationController);

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

const swaggerSpec = swaggerJsDoc(swaggerOpts);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
