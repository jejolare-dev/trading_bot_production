import { ServerWallet } from 'zano_web3/server';
import config from '@/config';

const walletInstance = new ServerWallet({
    daemonUrl: config.daemonUrl,
    walletUrl: config.walletUrl,
    walletAuthToken: config.walletAuthToken,
});

export default walletInstance;
