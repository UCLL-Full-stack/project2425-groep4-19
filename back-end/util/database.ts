// CONFIGURACTION OF INTERACTION WITH DATABASE

import { PrismaClient } from '@prisma/client';

const database = new PrismaClient();

export default database;
