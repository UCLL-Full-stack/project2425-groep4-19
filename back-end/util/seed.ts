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
    await prisma.stockItemTag.deleteMany();
    await prisma.stockItemTagRelation.deleteMany();
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

    const tag1 = await prisma.stockItemTag.create({
        data: {
            name: 'Tag 1',
            color: '#EE4B2B',
        },
    });

    const tag2 = await prisma.stockItemTag.create({
        data: {
            name: 'Tag 2',
            color: '#33ddff',
        },
    });

    // create stock items
    const item1 = await prisma.stockItem.create({
        data: {
            name: 'Item 1',
            quantity: 10,
        },
    });
    const item2 = await prisma.stockItem.create({
        data: {
            name: 'Item 2',
            quantity: 20,
        },
    });
    const item3 = await prisma.stockItem.create({
        data: {
            name: 'Item 3',
            quantity: 30,
        },
    });
    const item4 = await prisma.stockItem.create({
        data: {
            name: 'Item 4',
            quantity: 40,
        },
    });
    const item5 = await prisma.stockItem.create({
        data: {
            name: 'Item 5',
            quantity: 50,
        },
    });

    await prisma.stockItemTagRelation.createMany({
        data: [
            { stockItemId: item1.id, stockItemTagId: tag1.id },
            { stockItemId: item2.id, stockItemTagId: tag2.id },
            { stockItemId: item3.id, stockItemTagId: tag1.id },

            { stockItemId: item4.id, stockItemTagId: tag1.id },
            { stockItemId: item4.id, stockItemTagId: tag2.id },

            { stockItemId: item5.id, stockItemTagId: tag1.id },
            { stockItemId: item5.id, stockItemTagId: tag2.id },
        ],
    });

    // create organisation
    // add admin to organisation
    // add stock items to organisation

    await prisma.organisation.create({
        data: {
            name: "Admin's Organization",
            users: {
                connect: {
                    id: adminUser.id,
                },
            },
            stockItems: {
                connect: [
                    { id: item1.id },
                    { id: item2.id },
                    { id: item3.id },
                    { id: item4.id },
                    { id: item5.id },
                ],
            },
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
