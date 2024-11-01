import express, { Request, Response } from 'express';
import { UserInput } from '../types';
import userService from '../service/user.service';

const userRouter = express.Router();

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
