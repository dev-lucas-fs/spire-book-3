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

describe('GET /book/all', () => {
    it('should respond with status 200 and empty', async () => {
        const response = await server.get('/book/all');
        expect(response.body).toEqual([]);
    });

    it('should respond with status 200 and books', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        await connection.book.create({
            data: {
                name: 'TESTE 1',
                password: '123456',
                categoryId: category.id,
            },
        });

        const response = await server.get('/book/all');

        const books = await connection.book.findMany({
            select: {
                id: true,
                name: true,
                category: true,
                categoryId: true,
            },
        });

        expect(response.body).toEqual(books);
    });

    it('should respond with status 200 and empty if name not exist', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        await connection.book.create({
            data: {
                name: 'TESTE 1',
                password: '123456',
                categoryId: category.id,
            },
        });

        const response = await server.get('/book/all?name=naoExiste');

        const books = await connection.book.findMany({
            where: {
                name: 'naoExiste',
            },
        });

        expect(response.body).toEqual(books);
    });

    it('should respond with status 200 and books if name exist', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        await connection.book.create({
            data: {
                name: 'TESTE 1',
                password: '123456',
                categoryId: category.id,
            },
        });

        const response = await server.get('/book/all?name=TESTE 1');

        const books = await connection.book.findMany({
            where: {
                name: 'TESTE 1',
            },
            select: {
                id: true,
                name: true,
                category: true,
                categoryId: true,
            },
        });
        expect(response.body).toEqual(books);
    });
});

describe('GET /book/:name', () => {
    it('should respond with status 200 and empty if name not exist', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        await connection.book.create({
            data: {
                name: 'TESTE 1',
                password: '123456',
                categoryId: category.id,
            },
        });

        const response = await server
            .get('/book/NAO')
            .set('location', 'RIO DE JANEIRO - RJ - BR');

        const books = await connection.book.findFirst({
            where: {
                name: 'NAO',
            },
        });
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(books ?? []);
    });

    it('should respond with status 200 and book if name exist', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        await connection.book.create({
            data: {
                name: 'TESTE',
                password: '123456',
                categoryId: category.id,
                text: '',
            },
        });

        const response = await server
            .get('/book/TESTE')
            .set('location', 'RIO DE JANEIRO - RJ - BR');

        const books = await connection.book.findFirst({
            where: {
                name: 'TESTE',
            },
            select: {
                id: true,
                name: true,
                category: true,
                categoryId: true,
                text: true,
            },
        });
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(books);
    });

    it('should respond with status 400 if location not in headers', async () => {
        const response = await server.get('/book/TESTE');

        expect(response.status).toEqual(400);
    });
});

describe('POST /book', () => {
    it('should respond with status 400 if schema not correct', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        const response = await server.post('/book/create').send({
            name: 'titulo',
            categoryId: category.id,
        });
        expect(response.status).toEqual(400);
    });

    it('should respond with status 400 if name exist', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        await connection.book.create({
            data: {
                name: 'titulo',
                categoryId: category.id,
                password: '123456',
            },
        });
        const response = await server.post('/book/create').send({
            name: 'titulo',
            categoryId: category.id,
            password: '123456',
        });
        expect(response.status).toEqual(409);
    });

    it('should respond with status 200', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        const response = await server.post('/book/create').send({
            name: 'titulo',
            categoryId: category.id,
            password: '1234567',
        });
        expect(response.status).toEqual(200);
    });
});

describe('PUT /book/id', () => {
    it('should respond with status 404 if book not exist', async () => {
        const response = await server.put('/book/0').send({
            password: 'errado',
            text: 'sss',
        });
        expect(response.status).toEqual(404);
    });

    it('should respond with status 401 if password incorrect', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        const book = await connection.book.create({
            data: {
                name: 'titulo',
                categoryId: category.id,
                password: '123456',
            },
        });
        const response = await server.put('/book/' + book.id).send({
            password: 'errado',
            text: 'sss',
        });

        expect(response.status).toEqual(401);
    });

    it('should respond with status 200 and book if book exist and password correct', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        const password = await bcrypt.hash('123456', 10);
        const book = await connection.book.create({
            data: {
                name: 'titulo',
                categoryId: category.id,
                password: password,
            },
        });
        const response = await server.put('/book/' + book.id).send({
            password: '123456',
            text: 'sss',
        });

        expect(response.status).toEqual(200);
    });
});

describe('DELETE /book/id', () => {
    it('should respond with status 404 if book not exist', async () => {
        const response = await server.delete('/book/0').send({
            password: 'errado',
        });

        expect(response.status).toEqual(404);
    });

    it('should respond with status 401 if password incorrect', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        const book = await connection.book.create({
            data: {
                name: 'titulo',
                categoryId: category.id,
                password: '123456',
            },
        });
        const response = await server.delete('/book/' + book.id).send({
            password: 'errado',
        });

        expect(response.status).toEqual(401);
    });

    it('should respond with status 200 and book if book exist and password correct', async () => {
        const category = await connection.category.create({
            data: {
                name: 'TESTE 1',
            },
        });
        const password = await bcrypt.hash('123456', 10);
        const book = await connection.book.create({
            data: {
                name: 'titulo',
                categoryId: category.id,
                password: password,
            },
        });
        const response = await server.delete('/book/' + book.id).send({
            password: '123456',
        });

        expect(response.status).toEqual(200);
    });
});
