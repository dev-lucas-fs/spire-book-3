import { ConflictError, NotFoundError } from '../Errors';
import { Update, Delete, Create } from '../Protocols';
import {
    create,
    deleteById,
    findCategoryById,
    getAll,
    getById,
    getByName,
    updateById,
    createAccess,
    deleteAccess,
} from '../Repositories';
import bcrypt from 'bcrypt';

type getAllQueryParams = {
    limit?: number;
    name?: string;
};

async function getAllBooks(queryParams: getAllQueryParams) {
    const books = await getAll(queryParams.limit, queryParams.name);
    return books;
}

async function getBookByName(name: string, location: string) {
    const response = await getByName(name);
    if (!response) throw NotFoundError();
    await createAccess(location, response.id);
    return response;
}

async function createBook(createInfo: Create) {
    const response = await getByName(createInfo.name);
    if (response) throw ConflictError();

    const category = await findCategoryById(createInfo.categoryId);
    if (!category) throw NotFoundError();

    const password = await bcrypt.hash(createInfo.password, 10);
    return await create({
        name: createInfo.name,
        password,
        categoryId: createInfo.categoryId,
    });
}

async function isAuthorized(info: Delete) {
    const book = await getById(info.id);
    if (!book) throw NotFoundError();
    const compare = await bcrypt.compare(info.password, book.password);
    return compare;
}

function updateBook(info: Update) {
    return updateById(info);
}

async function deleteBook(id: number) {
    const book = await getById(id);
    if (!book) throw NotFoundError();
    await deleteAccess(id);
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
