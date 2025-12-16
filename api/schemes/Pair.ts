import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class Pair extends Model {
    declare readonly id: string;
    declare orderType: string;
    declare type: string;
    declare amount: string;
    declare price: string;
    declare active: boolean;
    declare userId: string;
    declare baseCurrency: string;
    declare quoteCurrency: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Pair.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        orderType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: false,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        baseCurrency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quoteCurrency: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'pairs',
        timestamps: true,
    },
);

export default Pair;
