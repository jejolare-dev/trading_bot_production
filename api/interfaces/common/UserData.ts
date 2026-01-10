export type WalletData = {
    id: string;
    address: string;
    file_name: string;
};

export type UserTokenPayload = {
    id: string;
    address: string;
    alias: string;
};

export default interface UserData {
    id: string;
    address: string;
    alias: string;
    wallet: WalletData | undefined;
}
