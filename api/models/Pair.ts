import CreatePairBody from "../interfaces/bodies/pair/CreatePairBody";
import DeletePairBody from "../interfaces/bodies/pair/DeletePairBody";
import EditPairBody from "../interfaces/bodies/pair/EditPairBody";
import PairData from "../interfaces/common/PairData";
import UserData from "../interfaces/common/UserData";
import PairRow from "../interfaces/database/PairRow";
import Pair from "../schemes/Pair";
import userService from "./User";

class PairModel {
    async getPairRow(id: number) {
        return await Pair.findOne({ where: { id } });
    }

    async getUserPairs(id: number) {
        return await Pair.findAll({ where: { user_id: id }});
    }

    async createPair(pairData: PairData, id: number) {
        return await Pair.create({
                user_id: id,
                order_type: pairData.orderType,
                type: pairData.type,
                price: pairData.price,
                amount: pairData.amount,
                active: true,
                base_currency: pairData.baseCurrency,
                quote_currency: pairData.quoteCurrency
            });
    }

    async editPair(updateFields: Partial<Omit<PairRow, 'id'>>, id: number) {
        const pairRow = await this.getPairRow(id);

        return await pairRow?.update({
            order_type: updateFields?.orderType ?? pairRow.order_type,
            type: updateFields?.type ?? pairRow.type,
            price: updateFields?.price ?? pairRow.price,
            amount: updateFields?.amount ?? pairRow.amount,
            active: updateFields?.active ?? pairRow.active,
            base_currency: updateFields?.baseCurrency ?? pairRow.base_currency,
            quote_currency: updateFields?.quoteCurrency ?? pairRow.quote_currency
        });  
    }

    async deletePair(id: number) {
        const pairRow = await this.getPairRow(id);
            
        await pairRow?.destroy();
    }

    async toggleActivation(id: number, active: boolean) {
        const pairRow = await this.getPairRow(id);
            
        return pairRow?.update({ active });
    }
}

const pairModel = new PairModel();

export default pairModel;