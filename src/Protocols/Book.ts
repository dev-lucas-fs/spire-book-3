type Book = {
    id: number;
    password?: string;
    name: string;
    text: string;
};

type Create = {
    categoryId: number;
    name: string;
    password: string;
};

type Delete = {
    password: string;
    id: number;
};

type Update = {
    password: string;
    text: string;
    id: number;
};

export { Book, Delete, Update, Create };
