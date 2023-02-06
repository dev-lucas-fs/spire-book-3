import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const connection = new PrismaClient();

export { connection };
