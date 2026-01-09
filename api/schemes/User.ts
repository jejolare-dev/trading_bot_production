import { Model, DataTypes } from 'sequelize';

import sequelize from '@/database/sequelize';
import Pair from './Pair';
import Wallet from './Wallet';

// User is considered not completely registered until they have a Wallet associated with them.
class User extends Model {
    declare readonly id: string;
    declare alias: string;
    declare address: string;
    declare wallet_id: string | null;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        alias: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'users',
        timestamps: true,
    },
);

User.hasMany(Pair, {
    foreignKey: 'userId',
    as: 'pairs',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    hooks: true,
});

Wallet.hasOne(User, {
    foreignKey: {
        name: 'wallet_id',
        allowNull: true,
    },
});

export default User;
