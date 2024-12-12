import { Model, DataTypes } from "sequelize";
import sequelize from "../sequelize";

class Pair extends Model {
    declare readonly id: number;
    declare order_type: string;
    declare type: string;
    declare amount: number;
    declare price: number;
    declare active: boolean;
    declare user_id: number;
    declare base_currency: string;
    declare quote_currency: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Pair.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    base_currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quote_currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'pairs',
    timestamps: true
});

export default Pair;