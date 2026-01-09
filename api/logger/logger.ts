import pino from 'pino';

import config from '@/config';

const logger = pino({
    level: config.logLevel ?? (config.nodeEnv === 'production' ? 'info' : 'trace'),
    transport:
        config.nodeEnv === 'production'
            ? undefined
            : {
                  target: 'pino-pretty',
                  options: {
                      colorize: true,
                      ignore: 'pid,hostname',
                  },
              },
});
export { logger };
