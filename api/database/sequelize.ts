import { Sequelize } from 'sequelize';

import config from '@/config';

const sequelize = new Sequelize({
    dialect: 'postgres',
    password: config.pgPassword,
    host: config.pgHost,
    username: config.pgUser,
    port: config.pgPort,
    database: config.pgDatabase,
    logging: false,
});

export default sequelize;
