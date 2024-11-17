import { User as UserPrisma } from '@prisma/client';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;

    constructor(user: {
        id?: number;
        email: string;
        username: string;
        password: string;
        role: string;
    }) {
        this.validate(user);
        this.id = user.id;
        this.email = user.email;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
    }
    // Validate user input
    validate(user: {
        id?: number;
        email: string;
        username: string;
        password: string;
        role: string;
    }) {
        if (!user.id) {
            throw new Error('ID is required!');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required!');
        }
        if (!user.username?.trim()) {
            throw new Error('username is required!');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required!');
        }
        if (!user.role?.trim()) {
            throw new Error('Role is required');
        }
    }

    static from({ id, email, username, password, role }: UserPrisma): User {
        return new User({
            id,
            email,
            username,
            password,
            role,
        });
    }
}
