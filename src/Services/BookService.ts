import { ConflictError, NotFoundError } from '../Errors';
import { Credentials, Update, Delete } from '../Protocols';
import {
    create,
    deleteById,
    getAll,
    getById,
    getByName,
    updateById,
} from '../Repositories';
import bcrypt from 'bcrypt';

type getAllQueryParams = {
    limit?: number;
    name?: string;
};

async function getAllBooks(queryParams: getAllQueryParams) {
    const books = await getAll(queryParams.limit, queryParams.name);
    return books.rows;
}

async function getBookByName(name: string) {
    const response = await getByName(name);
    if (response.rowCount > 0) return response.rows[0];
    throw NotFoundError();
}

async function createBook(credentials: Credentials) {
    const response = await getByName(credentials.name);
    if (response.rowCount > 0) throw ConflictError();

    const password = await bcrypt.hash(credentials.password, 10);
    return await create({ name: credentials.name, password });
}

async function isAuthorized(info: Delete) {
    const book = await getById(info.id);
    if (book.rowCount === 0) throw NotFoundError();
    const compare = await bcrypt.compare(info.password, book.rows[0].password);
    return compare;
}

function updateBook(info: Update) {
    return updateById(info);
}

function deleteBook(id: number) {
    return deleteById(id);
}

export {
    getAllBooks,
    deleteBook,
    updateBook,
    isAuthorized,
    createBook,
    getBookByName,
};
