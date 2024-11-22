import { User } from '../model/user';
import { UserInput } from '../types';
import database from '../util/database';
import bcrypt from 'bcrypt';

// TODO - Add comments to explain the functions

const findByUsername = async (username: string): Promise<User | undefined> => {
    const users = await getAllUsers();
    return users.find((user) => user.username === username);
};

const getAllUsers = async (): Promise<User[]> => {
    try {
        const users = await database.user.findMany({});

        return users.map((user) => User.from(user));
    } catch (error) {
        throw new Error(`Error getting users: ${error}`);
    }
};

const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const createUser = async ({
    email,
    username,
    password,
    role,
}: UserInput): Promise<{ message: string; user: User }> => {
    try {
        // check if user already exists
        const users = await getAllUsers();
        if (users.map((user) => user.email).includes(email)) {
            throw new Error('User already exists');
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ email, username, password: hashedPassword, role });

        // Save user to database
        const user = await database.user.create({
            data: {
                email: newUser.email,
                username: newUser.username,
                password: newUser.password,
                role: newUser.role,
            },
        });

        return { message: 'User registered successfully', user: newUser };
    } catch (error) {
        throw new Error(`Error creating user: ${error}`);
    }
};

const updateUserRole = async (userId: number, role: string): Promise<User> => {
    try {
        const updatedUser = await database.user.update({
            where: { id: userId },
            data: { role },
        });
        return User.from(updatedUser);
    } catch (error) {
        throw new Error(`Error updating user role: ${error}`);
    }
};

export default {
    findByUsername,
    getAllUsers,
    createUser,
    updateUserRole,
};
