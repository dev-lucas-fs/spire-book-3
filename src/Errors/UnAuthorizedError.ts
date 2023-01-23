import { ApplicationError } from '../Protocols';

export function UnAuthorizedError(): ApplicationError {
    return {
        name: 'UnauthorizedError',
        message: 'You must be signed in to continue',
    };
}
