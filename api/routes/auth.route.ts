import { Router } from 'express';
import { tryCatch } from '../utils/utils';
import authController from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/auth', tryCatch(authController.auth));
authRouter.post('/auth/validate-token', tryCatch(authController.validateToken));

export default authRouter;
