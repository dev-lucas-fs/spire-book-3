import express, { json } from 'express';
import 'dotenv/config';
import { bookRoutes } from './Routes';
import { HandleErrorMiddleware } from './Middlewares';
import { categoryRoutes } from './Routes/CategoryRoutes';

const app = express();
app.use(json());

app.use('/book', bookRoutes)
    .use('/category', categoryRoutes)
    .use(HandleErrorMiddleware);

app.listen(process.env.PORT || 4000);

export default app;
