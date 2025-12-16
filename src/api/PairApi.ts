import { AddPairData, EditPairData } from '@/interfaces/Pair';
import { getCookie, postFetch } from '@/utils/utils';

export default class PairApi {
    static async getPairData(url: string) {
        const token = getCookie('token');

        return postFetch('/api/pair/get-pair-data', {
            url,
            token,
        });
    }

    static async addPair(pairData: AddPairData) {
        const token = getCookie('token');

        return postFetch('/api/pair/add-pair', { token, pairData });
    }

    static async togglePairActivation(id: string, active: boolean) {
        const token = getCookie('token');

        return postFetch('/api/pair/toggle-pair-activation', { token, id, active });
    }

    static async deletePair(id: string) {
        const token = getCookie('token');

        return postFetch('/api/pair/delete-pair', { token, id });
    }

    static async editPair(pairData: EditPairData) {
        const token = getCookie('token');

        return postFetch('/api/pair/edit-pair', { token, pairData });
    }
}
