import { NextFunction, Request, Response } from 'express';
import verifyUserData from '../jwt/verifyUserToken';

class Middleware {
    async verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = verifyUserData(req.body.token);

            if (!userData) {
                throw new Error();
            }

            req.body.userData = userData;

            next();
        } catch {
            res.status(401).send({ success: false, data: 'Unauthorized' });
        }
    }
}

const middleware = new Middleware();

export default middleware;
