import PairData from "../../common/PairData";
import UserData from "../../common/UserData";

export default interface CreatePairBody {
    pairData: PairData,
    userData: UserData
}