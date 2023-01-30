import { connection } from '../Config';
import { Create, Update } from '../Protocols';

function getAll(limit: number = 20, name = '') {
    return connection.book.findMany({
        where: {
            name: {
                contains: name,
            },
        },
        take: limit,
        select: {
            id: true,
            category: true,
            categoryId: true,
            name: true,
        },
    });
}

function getById(id: number) {
    return connection.book.findFirst({
        where: {
            id,
        },
        select: {
            id: true,
            category: true,
            categoryId: true,
            name: true,
            text: true,
            password: true,
        },
    });
}

function getByName(name: string) {
    return connection.book.findFirst({
        where: {
            name,
        },
        select: {
            id: true,
            category: true,
            categoryId: true,
            name: true,
            text: true,
        },
    });
}

function create(createData: Create) {
    return connection.book.create({
        data: {
            name: createData.name,
            password: createData.password,
            categoryId: createData.categoryId,
        },
    });
}

function updateById(info: Update) {
    return connection.book.update({
        where: {
            id: info.id,
        },
        data: {
            text: info.text,
        },
    });
}

function deleteById(id: number) {
    return connection.book.delete({
        where: {
            id,
        },
    });
}

export { updateById, deleteById, getAll, getByName, getById, create };
