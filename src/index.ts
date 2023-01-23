import express, { json } from 'express';
import 'dotenv/config';
import { bookRoutes } from './Routes';

const app = express();
app.use(json());

app.use('/book', bookRoutes);

app.listen(process.env.PORT || 4000);
