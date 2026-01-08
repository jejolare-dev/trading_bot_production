import config from '@/config';
import sequelize from './sequelize';

async function prepareDatabase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        console.log('Connection to SQLite has been established successfully.');
        console.log(`Database "${config.sqliteDbPath}" is ready.`);
    } catch (error) {
        console.error('Unable to connect to the SQLite database:', error);
        throw error;
    }
}

export default prepareDatabase;
