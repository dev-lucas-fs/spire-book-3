import { connection } from '../src/Config/';

export async function cleanDb() {
    await connection.bookAccess.deleteMany({});
    await connection.book.deleteMany({});
    const book = await connection.book.findMany({});
    await connection.category.deleteMany({});
}
