import { connection } from '../Config';

function findCategoryById(id: number) {
    return connection.category.findFirst({
        where: {
            id,
        },
    });
}

function findCategoryByName(name: string) {
    return connection.category.findFirst({
        where: {
            name,
        },
    });
}

function findManyCategories() {
    return connection.category.findMany();
}

function createCategory(name: string) {
    return connection.category.create({
        data: {
            name,
        },
    });
}

export {
    findCategoryById,
    createCategory,
    findCategoryByName,
    findManyCategories,
};
