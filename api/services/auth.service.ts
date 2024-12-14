import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validateWallet from "../utils/validateWallet.js";
import AuthData from "../interfaces/bodies/user/AuthData.js";
import userModel from "../models/User.js";
import User from "../schemes/User.js";

dotenv.config();

class AuthService {
    private generateToken(payload: AuthData & { id: string }) {
        const { id, address, alias, signature, message } = payload;

        return jwt.sign({ id, address, alias, signature, message }, process.env.JWT_SECRET || "", 
            { expiresIn: "24h" }
        );
    }

    async auth(userData: AuthData) {
        const { address, alias, signature, message } = userData;

        if (!address || !alias || !signature || !message) {
            return { success: false, data: "Missing required fields: address, alias, signature, or message." };
        }

        const isValidWallet = await validateWallet(userData);

        if (!isValidWallet) {
            return { success: false, data: "Wallet validation failed. Invalid signature or message." };
        } 
        
        const existingUser = await userModel.getUserByAddress(userData.address);

        if (existingUser) {
            return { success: true, data: this.generateToken({ id: existingUser.id, ...userData })};
        }

        const newUser = await userModel.createUser(alias, address);

        if (!newUser) {
            return { success: false, data: "Failed to create a new user." };
        }

        return { success: true, data: this.generateToken({ id: newUser.id, ...userData })};
    }
}

const authService = new AuthService();

export default authService;