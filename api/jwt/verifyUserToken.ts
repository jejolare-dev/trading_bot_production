import jwt from 'jsonwebtoken';
import config from '@/config';
import UserData from '../interfaces/common/UserData';

function verifyUserData(token: string): UserData | undefined {
    try {
        return jwt.verify(token, config.jwtSecret) as UserData;
    } catch {
        return undefined;
    }
}

export default verifyUserData;
