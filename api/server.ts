import express from 'express';
import http from 'http';
import cors from 'cors';
import prepareDatabase from './prepareDatabase';
import pairRouter from './routes/pair.route';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

(async () => {
    await prepareDatabase();

    const corsOptions = {
        origin: (
            origin: string | undefined,
            callback: (err: Error | null, allow?: boolean) => void,
        ) => {
            if (!origin || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    };

    app.use(cors(corsOptions));

    app.use(express.json({ limit: '20000kb' }));
    app.use(express.static('./public'));

    app.use(express.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        next();
    });
    app.use('/api', [pairRouter, authRouter, userRouter]);

    server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})();
