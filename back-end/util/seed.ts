import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const prisma = new PrismaClient();

async function clearDatabase() {
    await prisma.user.deleteMany();
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
    await prisma.user.create({
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
