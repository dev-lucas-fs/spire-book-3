import express, { json } from 'express';
import 'dotenv/config';
import { bookRoutes } from './Routes';
import { HandleErrorMiddleware } from './Middlewares';

const app = express();
app.use(json());

app.use('/book', bookRoutes).use(HandleErrorMiddleware);

app.listen(process.env.PORT || 4000);
