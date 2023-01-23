import { ApplicationError } from '../Protocols/ApplicationError';

function NotFoundError(): ApplicationError {
    return {
        name: 'NotFoundError',
        message: 'No result for this search!',
    };
}

export { NotFoundError };
