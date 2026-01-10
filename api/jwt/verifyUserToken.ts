import jwt from 'jsonwebtoken';
import config from '@/config';
import { UserTokenPayload } from '@/interfaces/common/UserData';

function verifyUserData(token: string): UserTokenPayload | undefined {
    try {
        return jwt.verify(token, config.jwtSecret) as UserTokenPayload;
    } catch {
        return undefined;
    }
}

export default verifyUserData;
