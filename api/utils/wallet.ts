import { ServerWallet } from "zano_web3/server";

export const daemonUrl = process.env.DAEMON_URL || "http://127.0.0.1:11211/json_rpc";
export const walletUrl = process.env.DAEMON_URL || "http://127.0.0.1:12233/json_rpc";

const walletInstance = new ServerWallet({ daemonUrl, walletUrl });

export default walletInstance;