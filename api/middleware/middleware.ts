import { NextFunction, Request, Response } from 'express';

import User from '@/schemes/User';
import Wallet from '@/schemes/Wallet';
import UserData from '@/interfaces/common/UserData';
import logger from '@/logger';
import verifyUserData from '../jwt/verifyUserToken';

class Middleware {
    async verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const userTokenPayload = verifyUserData(req.body.token);

            if (!userTokenPayload) {
                res.status(401).send({ success: false, data: 'Unauthorized' });
                return;
            }

            const userRow = await User.findByPk(userTokenPayload.id, {
                include: Wallet,
            });

            if (!userRow) {
                throw new Error('User not found');
            }

            const userData: UserData = {
                id: userRow.id,
                address: userRow.address,
                alias: userRow.alias,
                wallet: undefined,
                // wallet: userRow.wallet
                //     ? {
                //           id: userRow.wallet.id,
                //           address: userRow.wallet.address,
                //           file_name: userRow.wallet.file_name,
                //       }
                //     : undefined,
            };

            req.body.userData = userData;

            next();
        } catch (error) {
            logger.error('Middleware.verifyToken -> error');
            logger.error(error);

            res.status(500).send({ success: false, data: 'Internal error' });
        }
    }
}

const middleware = new Middleware();

export default middleware;
