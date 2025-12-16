import { getCookie, postFetch } from '@/utils/utils';

export default class UserApi {
    static async checkUserExists() {
        const token = getCookie('token');

        return postFetch('/api/user/check-user-exists', { token });
    }
}
