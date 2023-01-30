import { Create, Update } from '../Protocols';
import {
    createBook,
    deleteBook,
    getAllBooks,
    getBookByName,
    updateBook,
} from '../Services';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

async function getAll(req: Request, res: Response) {
    const { name } = req.query;
    let getAllParams = { name: '' };
    if (name) getAllParams.name = String(name);
    try {
        const books = await getAllBooks(getAllParams);
        return res.status(httpStatus.OK).send(books);
    } catch (error) {
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function getByName(req: Request, res: Response) {
    const { name } = req.params;
    const { location } = req.headers;
    let getAllParams = { name: '' };
    if (name) getAllParams.name = String(name);
    if (!location) return res.sendStatus(httpStatus.BAD_REQUEST);
    try {
        const book = await getBookByName(getAllParams.name, location);
        return res.status(httpStatus.OK).send(book);
    } catch (error) {
        if (error.name === 'NotFoundError') return res.send([]);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function create(req: Request, res: Response) {
    const credentials = req.body as Create;

    try {
        const response = await createBook(credentials);
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        if (error.name === 'ConflictError')
            return res.sendStatus(httpStatus.CONFLICT);
        if (error.name === 'NotFoundError')
            return res.sendStatus(httpStatus.NOT_FOUND);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function update(req: Request, res: Response) {
    let { text, password } = req.body as Update;
    const { id } = req.params;

    try {
        const response = await updateBook({ text, password, id: Number(id) });
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function deleteById(req: Request, res: Response) {
    const { id } = req.params;
    console.log(id);
    try {
        const response = await deleteBook(Number(id));
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export { getAll, getByName, deleteById, update, create };
