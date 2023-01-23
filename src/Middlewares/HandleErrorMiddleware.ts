import { ApplicationError } from '../Protocols';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

function HandleErrorMiddleware(
    err: ApplicationError | Error,
    _req: Request,
    res: Response,
    next: NextFunction
) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}

export { HandleErrorMiddleware };
