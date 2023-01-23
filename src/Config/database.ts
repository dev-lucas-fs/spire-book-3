import { Pool } from 'pg';
import 'dotenv/config';

console.log(process.env.DATABASE_URL);

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.PROD ? true : false,
});

export { connection };
