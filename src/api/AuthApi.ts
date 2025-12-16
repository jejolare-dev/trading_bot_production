import { getCookie, postFetch } from '@/utils/utils';

export default class AuthApi {
    static async validateToken() {
        const token = getCookie('token');

        return postFetch('/api/auth/validate-token', { token });
    }
}
