import { connection } from '../Config';
import { BookPromise, Credentials, Update } from '../Protocols';

function getAll(limit: number = 20, name = ''): BookPromise {
    const queryParams: (string | number)[] = [limit];
    if (name) queryParams.push('%' + name + '%');
    console.log(name);
    const queryString = `SELECT ID, NAME, TEXT FROM BOOKS ${
        name ? 'WHERE NAME ILIKE $2' : ''
    } ORDER BY CREATED_AT LIMIT $1`;
    return connection.query(queryString, queryParams);
}

function getById(id: number): BookPromise {
    const queryString = 'SELECT * FROM BOOKS WHERE ID = $1';
    return connection.query(queryString, [id]);
}

function getByName(name: string): BookPromise {
    const queryString = 'SELECT ID, NAME, TEXT FROM BOOKS WHERE NAME = $1';
    return connection.query(queryString, [name]);
}

function create(credentials: Credentials) {
    const queryString = 'INSERT INTO BOOKS (NAME, PASSWORD) VALUES ($1, $2)';
    return connection.query(queryString, [
        credentials.name,
        credentials.password,
    ]);
}

function updateById(info: Update) {
    const queryString = 'UPDATE BOOKS SET TEXT = $1 WHERE ID = $2';
    return connection.query(queryString, [info.text, info.id]);
}

function deleteById(id: number) {
    const queryString = 'DELETE FROM BOOKS WHERE ID = $1';
    return connection.query(queryString, [id]);
}

export { updateById, deleteById, getAll, getByName, getById, create };
