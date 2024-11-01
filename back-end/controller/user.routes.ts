/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *            type: string
 *     UserInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         username:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 */

import express, { Request, Response } from 'express';
import { UserInput } from '../types';
import userService from '../service/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User functions
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       200:
 *         description: A User object is created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
//* Create new user
userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const user = <UserInput>req.body;
        const result = await userService.createUser(user);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({
            status: 'error',
            errorMessage: error.message || 'An error occurred',
        });
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: A token is returned upon successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *       500:
 *         description: Some server error
 */
//* Login user
userRouter.post('/login', async (req: Request, res: Response) => {
    // POST request to login
    try {
        const user = <UserInput>req.body;
        const role = await userService.getUserRoleByEmail(user.email);
        const token = await userService.loginUser(user);
        const response = { token: token, role: role };
        res.status(200).json(response);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(401).json({ status: 'error', errorMessage: errorMessage });
    }
});

export default userRouter;
