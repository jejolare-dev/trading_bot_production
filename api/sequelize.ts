import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.PATH_SQLITE || 'trading_bot.sqlite',
    logging: false,
});

export default sequelize;
