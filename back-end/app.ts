import * as dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import userRouter from './controller/user.routes';

const app: Express = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

//* Middlewares
app.use(cors());
app.use(bodyParser.json());

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

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
