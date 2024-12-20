import { User as UserPrisma } from '@prisma/client';
import { Organisation } from './organisation';

export class User {
    readonly id?: number;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
    readonly organisationId?: number;
    readonly organisation?: Organisation;

    constructor(user: {
        id?: number;
        email: string;
        username: string;
        password: string;
        role: string;
        organisationId?: number;
        organisation?: Organisation;
    }) {
        this.validate(user);
        this.id = user.id;
        this.email = user.email;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
        this.organisationId = user.organisationId;
        this.organisation = user.organisation;
    }

    // Validate user input
    validate(user: {
        id?: number;
        email: string;
        username: string;
        password: string;
        role: string;
    }) {
        if (!user.email?.trim()) {
            throw new Error('Email is required!');
        }
        if (!user.username?.trim()) {
            throw new Error('Username is required!');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required!');
        }
        if (!user.role?.trim()) {
            throw new Error('Role is required');
        }
    }

    static from(
        { id, email, username, password, role, organisationId }: UserPrisma,
        organisation?: Organisation
    ): User {
        return new User({
            id,
            email,
            username,
            password,
            role,
            organisationId: organisationId ?? undefined,
            organisation: organisation ?? undefined,
        });
    }
}
