import AuthData from "../interfaces/bodies/user/AuthData";
import User from "../schemes/User";

class UserModel {
    async getUserById(id: string) {
        return await User.findByPk(id);
    }

    async getUserByAddress(address: string) {
        return await User.findOne({ where: { address } });
    }

    async createUser(alias: string, address: string) {
        return await User.create({ alias, address });
    }
}

const userModel = new UserModel();

export default userModel;