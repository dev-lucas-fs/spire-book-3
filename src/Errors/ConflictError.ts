import { ApplicationError } from '../Protocols/ApplicationError';

function ConflictError(): ApplicationError {
    return {
        name: 'ConflictError',
        message: 'There are a conflict!',
    };
}

export { ConflictError };
