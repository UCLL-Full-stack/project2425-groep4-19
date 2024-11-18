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
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
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
        const role = await userService.getUserRoleByUsername(user.username);
        const token = await userService.loginUser(user);
        const organisationid = await userService.getOrganisationIdByUsername(user.username);
        const response = { token: token, role: role, organisationId: organisationid };
        res.status(200).json(response);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ status: 'error', errorMessage: err.message });
    }
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

//* Get all users
userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ status: 'error', errorMessage: err.message });
    }
});

/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Get User by username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: Username of the user
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */

//* get user by username
userRouter.get('/:username', async (req: Request, res: Response) => {
    try {
        const username = req.params.username;
        console.log('username: ', username);

        const user = await userService.getUserByUsername(username);
        res.status(200).json(user);
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ status: 'error', errorMessage: err.message });
    }
});

//Todo error handling

export default userRouter;
