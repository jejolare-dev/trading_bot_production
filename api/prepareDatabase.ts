import dotenv from 'dotenv';
import sequelize from './sequelize';

dotenv.config();

async function prepareDatabase() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();

        console.log('Connection to SQLite has been established successfully.');
        console.log(`Database "${process.env.SQLITE_DB_PATH || 'trading_bot.sqlite'}" is ready.`);
    } catch (error) {
        console.error('Unable to connect to the SQLite database:', error);
        throw error;
    }
}

export default prepareDatabase;
