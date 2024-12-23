import dotenv from "dotenv";
import { Request, Response } from "express";
import AuthData from "../interfaces/bodies/user/AuthData.js";
import authService from "../services/auth.service.js";
import verifyUserData from "../jwt/verifyUserToken.js";
import { validationResult } from "express-validator";

dotenv.config();

class AuthController {
    async auth(req: Request, res: Response) {
        const userData: AuthData = req.body.data;    
        const data = await authService.auth(userData);

        if (data.success && typeof data.data === "object" && data.data.token) {
            res.cookie("token", data.data.token);
            res.status(200).send(data);
        } else {
            res.status(400).send(data);
        }
    }

    async validateToken(req: Request, res: Response) {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.status(400).send({ success: false, data: "Invalid data" });
        }

        const data = verifyUserData(req.body.token);
    
        if (data) { 
            return res.status(200).send({ success: true, data: { isValid: true } });
        } else {
            return res.status(400).send({ success: false, data: { isValid: false } });
        }
    }
}

const authController = new AuthController();

export default authController;