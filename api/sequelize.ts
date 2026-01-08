import { Sequelize } from 'sequelize';
import config from '@/config';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.sqliteDbPath,
    logging: false,
});

export default sequelize;
