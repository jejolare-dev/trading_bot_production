import UserData from "../../common/UserData";
import PairRow from "../../database/PairRow";


export default interface EditPairBody {
    pairData: { id: string } & Partial<Omit<PairRow, 'id'>>,
    userData: UserData
}