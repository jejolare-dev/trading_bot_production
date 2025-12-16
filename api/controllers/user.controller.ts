import { Request, Response } from 'express';
import userService from '../services/user.service.js';

class UserController {
    async checkUserExists(req: Request, res: Response) {
        const { userData } = req.body;
        const data = await userService.checkUserExists(userData);

        if (!data.success) {
            return res.status(400).send(data);
        }

        return res.status(200).send(data);
    }

    async getUserInfo(req: Request, res: Response) {
        const { userData } = req.body;
        const data = await userService.getUserInfo(userData);

        if (!data.success) {
            return res.status(400).send(data);
        }

        return res.status(200).send(data);
    }
}

const userController = new UserController();

export default userController;
