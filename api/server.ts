import express from 'express';
import http from 'http';
import cors from 'cors';

import config from '@/config';
import prepareDatabase from '@/database/prepareDatabase';
import pairRouter from './routes/pair.route';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import logger from './logger';

const app = express();
const server = http.createServer(app);

(async () => {
    await prepareDatabase();

    app.use(
        cors({
            origin: config.frontendServerUrl,
        }),
    );

    app.use(express.json({ limit: '20000kb' }));

    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        next();
    });
    app.use('/api', [pairRouter, authRouter, userRouter]);

    server.listen(config.port, () => logger.info(`Server is running on port ${config.port}`));
})();
