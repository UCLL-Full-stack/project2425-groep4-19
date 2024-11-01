import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserInput } from '../types';
import userRepository from '../repository/user.repository';
import { User } from '../model/user';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    console.error('JWT_SECRET is not defined. Please set it in your environment variables.');
}

// Generate a JWT token
const generateJwtToken = (email: string): string => {
    const payload = { email };
    const expiresIn = `${process.env.JWT_EXPIRES_HOURS}`;
    const options = { expiresIn, issuer: 'libremory' };
    try {
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined.');
        }
        return jwt.sign(payload, jwtSecret, options);
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error generating JWT token:', error.message);
        }
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

//* Login user
const loginUser = async ({ email, password }: UserInput): Promise<string> => {
    // get user by email
    const user = userRepository.findByEmail(email);
    if (!user) {
        throw new Error('Email is incorrect.');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error('Email and/or password is incorrect.');
    }
    return generateJwtToken(email);
};

//* Create new user
const createUser = async ({
    email,
    username,
    password,
    role,
}: UserInput): Promise<{ message: string; user: User }> => {
    // Check if user already exists
    const allUsers = await userRepository.getAllUsers();
    if (allUsers.map((user) => user.email).includes(email)) {
        throw new Error('User already exists');
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, username, password: hashedPassword, role });
    await userRepository.createUser(newUser);

    return { message: 'User registered successfully', user: newUser };
};

export default {
    createUser,
    loginUser,
};