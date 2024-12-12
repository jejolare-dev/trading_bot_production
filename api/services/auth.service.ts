import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validateWallet from "../utils/validateWallet.js";
import AuthData from "../interfaces/bodies/user/AuthData.js";
import userModel from "../models/User.js";

dotenv.config();

class AuthService {
    async auth(userData: AuthData) {
        const { address, alias, signature, message } = userData;

        if (!address || !alias || !signature || !message) {
            return { success: false, data: "Invalid auth data" };
        }

        const dataValid = !!(userData && userData.address && alias && (await validateWallet(userData)));

        if (!dataValid) {
            return { success: false, data: "Invalid auth data" };
        } 
        
        const userRow = await userModel.getUserRow(userData.address);

        if (userRow) {
            const token = jwt.sign({ ...userData }, process.env.JWT_SECRET || "", { expiresIn: "24h" });

            return { success: true, data: token };
        }

        const newUserRow = await userModel.createUser(userData.alias, userData.address);

        if (!newUserRow) {
            return { success: false, data: "User is not created" };
        }
        
        const token = jwt.sign({ ...userData }, process.env.JWT_SECRET || "", { expiresIn: "24h" });

        return { success: true, data: token };
    }
}

const authService = new AuthService();

export default authService;