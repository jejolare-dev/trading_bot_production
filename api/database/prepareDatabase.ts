import config from '@/config';
import sequelize from './sequelize';
import initdb from './initdb';

async function prepareDatabase() {
    try {
        await initdb();
        await sequelize.authenticate();
        await sequelize.sync();

        console.log('Connection to PostgreSQL has been established successfully.');
        console.log(`Database "${config.pgDatabase}" is ready.`);
    } catch (error) {
        console.error('Unable to connect to the PostgreSQL database:', error);
        throw error;
    }
}

export default prepareDatabase;
