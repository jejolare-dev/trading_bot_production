import pg from 'pg';

import config from '@/config';

async function initdb() {
    const pool = new pg.Pool({
        user: config.pgUser,
        password: config.pgPassword,
        host: config.pgHost,
        database: 'postgres',
        port: config.pgPort,
        keepAlive: true,
        idleTimeoutMillis: 0,
        max: 100,
    });

    try {
        await pool.query(`CREATE DATABASE "${config.pgDatabase}" `);
    } catch (error: unknown) {
        if (
            typeof error === 'object' &&
            error !== null &&
            'code' in error &&
            error.code === '42P04'
        ) {
            console.log('Database already exists, skipping creation');
        } else {
            throw error;
        }
    }

    await pool.end();
}

export default initdb;
