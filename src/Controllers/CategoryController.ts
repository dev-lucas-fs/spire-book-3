import {
    create,
    findById,
    findCategories,
} from '../Services/CategoryRepository';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

async function getCategories(req: Request, res: Response) {
    try {
        const categories = await findCategories();
        return res.status(httpStatus.OK).send(categories);
    } catch (error) {
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

async function getCategoryById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const category = await findById(Number(id));
        return res.status(httpStatus.OK).send(category);
    } catch (error) {
        if (error.name === 'NotFoundError')
            return res.status(httpStatus.NOT_FOUND);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

type createCategory = {
    name: string;
};

async function postCreateCategory(req: Request, res: Response) {
    const { name } = req.body as createCategory;
    if (!name) return res.sendStatus(httpStatus.BAD_REQUEST);
    try {
        const category = await create(name);
        return res.status(httpStatus.CREATED).send(category);
    } catch (error) {
        if (error.name === 'ConflictError')
            return res.sendStatus(httpStatus.CONFLICT);
        console.log(error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

export { getCategories, getCategoryById, postCreateCategory };
