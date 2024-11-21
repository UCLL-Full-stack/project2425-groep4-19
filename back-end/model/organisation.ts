import { Organisation as OrganisationPrisma, User as UserPrisma } from '@prisma/client';
import { User } from './user';
import { StockItem } from './stockItem';

export class Organisation {
    readonly id: number;
    readonly name: string;
    readonly users?: User[];
    readonly stockItems?: StockItem[];

    constructor(organisation: {
        id: number;
        name: string;
        users?: User[];
        stockItems?: StockItem[];
    }) {
        this.validate(organisation);
        this.id = organisation.id;
        this.name = organisation.name;
        this.users = organisation.users;
        this.stockItems = organisation.stockItems;
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

    //TODO - Why is stockItems defined and not using the StockItem class?
    static from({
        id,
        name,
        users,
        stockItems,
    }: OrganisationPrisma & { users?: UserPrisma[] } & {
        stockItems?: {
            id: number;
            name: string;
            organisationId: number | null;
            quantity: number;
        }[];
    }): Organisation {
        return new Organisation({
            id,
            name,
            users: users?.map((user) => User.from(user)), // Convert each user to the custom User class
            stockItems: stockItems?.map((stockItem) => StockItem.from(stockItem)), // Convert each stock item to the custom StockItem class
        });
    }
}
