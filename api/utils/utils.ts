import { Request, Response } from 'express';

import logger from '@/logger';

export function tryCatch(
    fn: (req: Request, res: Response) => Promise<unknown>,
    cleanup?: () => Promise<void>,
) {
    return async function (req: Request, res: Response) {
        try {
            await fn(req, res);
        } catch (err) {
            logger.error(err);
            res.status(500).send({ success: false, data: 'Internal error' });
        } finally {
            if (cleanup) {
                await cleanup();
            }
        }
    };
}

export function getTradingIdFromUrl(url: string) {
    const baseUrl = 'https://trade.zano.org/dex/trading/';

    if (!url.startsWith(baseUrl)) return;

    const id = url.slice(baseUrl.length);
    const numberId = parseInt(id, 10);

    if (Number.isNaN(numberId)) return;

    return numberId;
}
