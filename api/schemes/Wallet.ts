import { DataTypes, Model } from 'sequelize';

import sequelize from '@/database/sequelize';

class Wallet extends Model {
    declare readonly id: string;
    declare address: string;
    declare file_name: string;
    declare password: string;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Wallet.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        file_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'wallets',
        timestamps: true,
    },
);

export default Wallet;
