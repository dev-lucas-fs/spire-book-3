import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

console.log(process.env.DATABASE_URL);

const connection = new PrismaClient();

export { connection };
