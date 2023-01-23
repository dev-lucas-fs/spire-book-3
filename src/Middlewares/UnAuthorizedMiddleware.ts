import { isAuthorized } from '../Services';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

export async function UnAuthorizedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { id } = req.params;
    const { password } = req.body;
    try {
        if (!(await isAuthorized({ id: Number(id), password })))
            return res.sendStatus(httpStatus.UNAUTHORIZED);
    } catch (error) {
        console.log(error);
        if (error.name === 'NotFoundError')
            return res.sendStatus(httpStatus.NOT_FOUND);

        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }

    return next();
}
