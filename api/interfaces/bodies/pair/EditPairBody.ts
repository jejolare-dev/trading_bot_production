import UserData from "../../common/UserData";
import PairRow from "../../database/PairRow";

type RequiredPairFields = "id" | "type" | "amount" | "price";
type EditPairData = Partial<Omit<PairRow, RequiredPairFields>> & Required<Pick<PairRow, RequiredPairFields>>;

export default interface EditPairBody {
    pairData: EditPairData,
    userData: UserData
}