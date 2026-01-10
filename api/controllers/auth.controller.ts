import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { CreateTradeWalletBodyDTO } from '@/validators/auth/create-trade-wallet.validator.js';
import AuthData from '../interfaces/bodies/user/AuthData.js';
import authService from '../services/auth.service.js';
import verifyUserData from '../jwt/verifyUserToken.js';

dotenv.config();

class AuthController {
    async auth(req: Request, res: Response) {
        const userData: AuthData = req.body.data;
        const data = await authService.auth(userData);

        if (!(data.success && typeof data.data === 'object' && data.data.token)) {
            return res.status(400).send(data);
        }

        res.cookie('token', data.data.token);

        return res.status(200).send(data);
    }

    async validateToken(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, data: 'Invalid data' });
        }

        const data = verifyUserData(req.body.token);

        if (!data) {
            return res.status(400).send({ success: false, data: { isValid: false } });
        }

        return res.status(200).send({ success: true, data: { isValid: true } });
    }

    createTradeWallet = async (req: Request, res: Response) => {
        const body = req.body as CreateTradeWalletBodyDTO;
    };
}

const authController = new AuthController();

export default authController;
