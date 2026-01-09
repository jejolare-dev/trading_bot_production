import config from '@/config';
import logger from '@/logger';
import sequelize from './sequelize';
import initdb from './initdb';

async function prepareDatabase() {
    try {
        await initdb();
        await sequelize.authenticate();
        await sequelize.sync();

        logger.info('Connection to PostgreSQL has been established successfully.');
        logger.info(`Database "${config.pgDatabase}" is ready.`);
    } catch (error) {
        logger.error('Unable to connect to the PostgreSQL database:');
        logger.error(error);
        throw error;
    }
}

export default prepareDatabase;
