import { create, deleteById, getAll, getByName, update } from '../Controllers';
import { UnAuthorizedMiddleware, ValidateBody } from '../Middlewares';
import { Router } from 'express';
import {
    DeleteBookSchema,
    UpdateBookSchema,
    CreateBookSchema,
} from '../Schemas';

const bookRoutes = Router();

bookRoutes.get('/all', getAll);
bookRoutes.get('/:name', getByName);
bookRoutes.post('/create', ValidateBody(CreateBookSchema), create);
bookRoutes.put(
    '/:id',
    ValidateBody(UpdateBookSchema),
    UnAuthorizedMiddleware,
    update
);
bookRoutes.delete(
    '/:id',
    ValidateBody(DeleteBookSchema),
    UnAuthorizedMiddleware,
    deleteById
);

export { bookRoutes };
