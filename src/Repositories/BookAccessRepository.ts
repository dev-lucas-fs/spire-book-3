import { connection } from '../Config';

function createAccess(location: string, bookId: number) {
    return connection.bookAccess.create({
        data: {
            location,
            bookId,
        },
    });
}

function deleteAccess(bookId: number) {
    return connection.bookAccess.deleteMany({
        where: {
            bookId,
        },
    });
}

export { createAccess, deleteAccess };
