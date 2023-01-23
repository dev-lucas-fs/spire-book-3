import { create, deleteById, getAll, getByName, update } from '../Controllers';
import { UnAuthorizedMiddleware } from '../Middlewares/UnAuthorizedMiddleware';
import { Router } from 'express';

const bookRoutes = Router();

bookRoutes.get('/all', getAll);
bookRoutes.get('/:name', getByName);
bookRoutes.post('/create', create);
bookRoutes.put('/:id', UnAuthorizedMiddleware, update);
bookRoutes.delete('/:id', UnAuthorizedMiddleware, deleteById);

export { bookRoutes };
