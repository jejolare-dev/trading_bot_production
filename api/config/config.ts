import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const rawEnvSchema = z.object({
    PORT: z.coerce.number().int().positive().default(3000),
    PGUSER: z.string().trim(),
    PGHOST: z.string().trim(),
    PGPORT: z.coerce.number().int().max(65535),
    PGDATABASE: z.string().trim(),
    PGPASSWORD: z.string().trim(),
    DAEMON_URL: z.url().trim().default('http://127.0.0.1:11211/json_rpc'),
    WALLET_URL: z.url().trim().default('http://127.0.0.1:11211/json_rpc'),
    WALLET_AUTH_TOKEN: z.string().trim().default(''),
    JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
});

const env = rawEnvSchema.parse(process.env);

export const config = {
    port: env.PORT,
    pgUser: env.PGUSER,
    pgHost: env.PGHOST,
    pgPort: env.PGPORT,
    pgDatabase: env.PGDATABASE,
    pgPassword: env.PGPASSWORD,
    daemonUrl: env.DAEMON_URL,
    walletUrl: env.WALLET_URL,
    walletAuthToken: env.WALLET_AUTH_TOKEN,
    jwtSecret: env.JWT_SECRET,
} as const;

export type Config = typeof config;
