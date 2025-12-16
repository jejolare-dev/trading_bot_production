import { ServerWallet } from 'zano_web3/server';

export const daemonUrl = process.env.DAEMON_URL || 'http://127.0.0.1:11211/json_rpc';
export const walletUrl = process.env.WALLET_URL || 'http://127.0.0.1:11211/json_rpc';
export const walletAuthToken = process.env.WALLET_AUTH_TOKEN || '';

const walletInstance = new ServerWallet({
    daemonUrl,
    walletUrl,
    walletAuthToken,
});

export default walletInstance;
