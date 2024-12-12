import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize";
import Pair from "./Pair";

class User extends Model {
    declare readonly id: number;
    declare alias: string;
    declare address: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

User.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    alias: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize,
    modelName: 'users',
    timestamps: true
});


User.hasMany(Pair, {
    foreignKey: 'user_id',
    as: 'pairs',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    hooks: true,
});

export default User;