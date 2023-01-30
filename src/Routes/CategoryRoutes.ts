import { ValidateBody } from '../Middlewares';
import { Router } from 'express';
import {
    getCategories,
    getCategoryById,
    postCreateCategory,
} from '../Controllers/CategoryController';

const categoryRoutes = Router();
categoryRoutes.get('/all', getCategories);
categoryRoutes.get('/:id', getCategoryById);
categoryRoutes.post('/create', postCreateCategory);

export { categoryRoutes };
