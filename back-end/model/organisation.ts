import { Organisation as OrganisationPrisma, User as UserPrisma } from '@prisma/client';
import { User } from './user';

export class Organisation {
    readonly id: number;
    readonly name: string;
    readonly users?: User[];

    constructor(organisation: { id: number; name: string; users?: User[] }) {
        this.validate(organisation);
        this.id = organisation.id;
        this.name = organisation.name;
        this.users = organisation.users;
    }

    // Validate organisation input
    validate(organisation: { id: number; name: string }) {
        if (!organisation.id) {
            throw new Error('ID is required!');
        }
        if (!organisation.name?.trim()) {
            throw new Error('Name is required!');
        }
    }

    // Convert Prisma organisation to Organisation
    static from({ id, name, users }: OrganisationPrisma & { users?: UserPrisma[] }): Organisation {
        return new Organisation({
            id,
            name,
            users: users?.map((user) => User.from(user)), // Convert each user to the custom User class
        });
    }
}
