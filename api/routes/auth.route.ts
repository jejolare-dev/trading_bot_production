import { Router } from "express";
import { tryCatch } from "../utils/utils";
import authController from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/auth", tryCatch(authController.auth));

export default authRouter;