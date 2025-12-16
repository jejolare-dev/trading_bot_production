import User from '../schemes/User';

class UserModel {
    async getUserById(id: string) {
        return User.findByPk(id);
    }

    async getUserByAddress(address: string) {
        return User.findOne({ where: { address } });
    }

    async createUser(alias: string, address: string) {
        return User.create({ alias, address });
    }
}

const userModel = new UserModel();

export default userModel;
