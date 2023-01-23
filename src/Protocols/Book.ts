import { QueryResult } from 'pg';

type Book = {
    id: number;
    password?: string;
    name: string;
    text: string;
};

type BookPromise = Promise<QueryResult<Book>>;

export { Book, BookPromise };
