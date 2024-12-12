import CreatePairBody from "../interfaces/bodies/pair/CreatePairBody";
import DeletePairBody from "../interfaces/bodies/pair/DeletePairBody";
import EditPairBody from "../interfaces/bodies/pair/EditPairBody";
import UserData from "../interfaces/common/UserData";
import pairModel from "../models/Pair";
import userModel from "../models/User";

class PairService {
    async getUserPairs(userData: UserData) {
        const userRow = await userModel.getUserRow(userData.address);

        if (!userRow) {
            return { success: false, data: "User not found" };
        }

        const pairs = await pairModel.getUserPairs(userRow.id);          

        return { success: true, data: pairs };
    }

    async createPair(body: CreatePairBody) {
        const pairData = body.pairData;
        const userData = body.userData;

        const userRow = await userModel.getUserRow(userData.address);

        if (!userRow) {
            return { success: false, data: "User not found" };
        }

        const newPair = await pairModel.createPair(pairData, userRow.id);

        if (!newPair) {
            return { success: false, data: "Pair is not created" };
        }           

        return { success: true };
    }

    async editPair(body: EditPairBody) {
        const pairData = body.pairData;
        const { id, ...updateFields } = pairData;
        const userData = body.userData;

        const pairRow = await pairModel.getPairRow(id);

        if (!pairRow) {
            return { success: false, data: "Pair not found" };
        }

        const userRow = await userModel.getUserRow(userData.address);

        if (!userRow) {
            return { success: false, data: "User not found" };
        }

        if (userRow.id !== pairRow.user_id) {
            return { success: false, data: "User cannot update this pair" };
        }

        const updatedPair = await pairModel.editPair(updateFields, userRow.id);  
        
        if (!updatedPair) {
            return { success: false, data: "Pair is not updated" };
        }

        return { success: true };
    }

    async deletePair(body: DeletePairBody) {
        const { id, userData } = body;
        const pairRow = await pairModel.getPairRow(id);

        if (!pairRow) {
            return { success: false, data: "Pair not found" };
        }

        const userRow = await userModel.getUserRow(userData.address);

        if (!userRow) {
            return { success: false, data: "User not found" };
        }

        if (userRow.id !== pairRow.user_id) {
            return { success: false, data: "User cannot delete this pair" };
        }

        const isDeleted = await pairModel.deletePair(id);

        return { success: true };
    }

    async toggleActivation(userData: UserData, id: number, active: boolean) {
        const pairRow = await pairModel.getPairRow(id);
    
        if (!pairRow) {
            return { success: false, data: "Pair not found" };
        }

        const userRow = await userModel.getUserRow(userData.address);

        if (!userRow) {
            return { success: false, data: "User not found" };
        }

        if (userRow.id !== pairRow.user_id) {
            return { success: false, data: "User cannot update this pair" };
        }

        const isUpdated = await pairModel.toggleActivation(id, active);

        if (!isUpdated) {
            return { success: false, data: "Pair is not updated" };
        }

        return { success: true };
    }
}

const pairService = new PairService();

export default pairService;