import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { clear } from 'console';

dotenv.config();

const prisma = new PrismaClient();

async function clearDatabase() {
    await prisma.user.deleteMany();
    await prisma.organisation.deleteMany();
    await prisma.stockItem.deleteMany();
}

const main = async () => {
    console.log('Clearing database...');
    await clearDatabase();
    console.log('Database cleared.');

    console.log('Seeding database...');

    if (!process.env.ADMIN_PASSWORD) {
        throw new Error('ADMIN_PASSWORD is not defined in the environment variables');
    }
    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    if (!process.env.USER_PASSWORD) {
        throw new Error('ADMIN_PASSWORD is not defined in the environment variables');
    }
    const userPassword = await bcrypt.hash(process.env.USER_PASSWORD, 10);

    // Create admin user
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@admin.com',
            username: 'admin',
            password: adminPassword,
            role: 'admin',
        },
    });

    // Create regular user
    await prisma.user.create({
        data: {
            email: 'user@user.com',
            username: 'user',
            password: userPassword,
            role: 'user',
        },
    });

    // assign admin to new organization

    await prisma.organisation.create({
        data: {
            name: "Admin's Organization",
            users: {
                connect: {
                    id: adminUser.id,
                },
            },
        },
    });

    // create stock items
    await prisma.stockItem.create({
        data: {
            name: 'Item 1',
            quantity: 10,
        },
    });
    await prisma.stockItem.create({
        data: {
            name: 'Item 2',
            quantity: 20,
        },
    });
    await prisma.stockItem.create({
        data: {
            name: 'Item 3',
            quantity: 30,
        },
    });
    await prisma.stockItem.create({
        data: {
            name: 'Item 4',
            quantity: 40,
        },
    });
    await prisma.stockItem.create({
        data: {
            name: 'Item 5',
            quantity: 50,
        },
    });
};

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
