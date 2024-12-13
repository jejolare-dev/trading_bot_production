import { Model, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import sequelize from "../sequelize";
import Pair from "./Pair";

class User extends Model {
    declare readonly id: string;
    declare alias: string;
    declare address: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

User.init({
    id: { 
        type: DataTypes.STRING, 
        primaryKey: true, 
        defaultValue: () => uuidv4()
    },
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
    foreignKey: 'userId',
    as: 'pairs',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    hooks: true,
});

export default User;