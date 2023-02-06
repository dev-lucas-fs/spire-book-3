import supertest from 'supertest';
import app from './../src';
import { connection } from './../src/Config';
import { cleanDb } from './helpers';
import bcrypt from 'bcrypt';

beforeAll(async () => {
    await cleanDb();
});

afterEach(async () => {
    await cleanDb();
});

const server = supertest(app);

describe('GET /category/all', () => {
    it('should respond with status 200 and empty', async () => {
        const response = await server.get('/category/all');
        expect(response.body).toEqual([]);
    });

    it('should respond with status 200 and categories', async () => {
        await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });

        const response = await server.get('/category/all');

        const category = await connection.category.findMany({
            select: {
                id: true,
                name: true,
            },
        });

        expect(response.body).toEqual(category);
    });
});

describe('GET /category/:id', () => {
    it('should respond with status 200 and category if id exist', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });

        const response = await server.get('/category/' + category.id);

        expect(response.status).toEqual(200);
        expect(response.body).toEqual(category);
    });
});

describe('POST /category', () => {
    it('should respond with status 400 if schema not correct', async () => {
        await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        const response = await server.post('/category/create').send({});
        expect(response.status).toEqual(400);
    });

    it('should respond with status 409 if name exist', async () => {
        const category = await connection.category.create({
            data: {
                name: 'titulo',
            },
        });

        const response = await server.post('/category/create').send({
            name: 'titulo',
        });
        expect(response.status).toEqual(409);
    });

    it('should respond with status 201', async () => {
        const response = await server.post('/category/create').send({
            name: 'titulo2',
        });
        expect(response.status).toEqual(201);
    });
});
