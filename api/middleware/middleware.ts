import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserData from "../interfaces/common/UserData";

class Middleware {
    async verifyToken(req: Request, res: Response, next: NextFunction) {
        try {
            const userData = jwt.verify(req.body.token, process.env.JWT_SECRET || "") as UserData;
            req.body.userData = userData;
            next();
        } catch {
            res.status(401).send({ success: false, data: "Unauthorized" });
        }
    }
}

const middleware = new Middleware();

export default middleware;