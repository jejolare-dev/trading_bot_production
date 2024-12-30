import styles from "./styles.module.scss";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Trading from "@/components/Trading/Trading";
import axios from "axios";
import { Asset } from "@/interfaces/Asset";

const TradingPage = async () => {
    const { 
        initialPairs, 
        walletData, 
        assets, 
        totalZanoUsd, 
        zanoUsd24Change 
    } = await fetchInitialData();

    return (
        <main className={styles.container}>
            <Trading 
                initialPairs={initialPairs} 
                walletData={walletData} 
                assets={assets} 
                totalZanoUsd={totalZanoUsd}
                zanoUsd24Change={zanoUsd24Change}
                />
        </main>
    )
}

export default TradingPage;

async function fetchInitialData() {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        redirect('/');
    }

    const userPairs = await fetchUserPairs(token);
    const walletData = await fetchWalletData(token);
    const assets = await fetchUserAssets(token);

    if (!assets.success && assets?.data === "BALANCES_FETCH_ERROR") {
        redirect("/incorrect-setup");
    }

    const rate = await fetchZanoRate();
    const totalZano = assets?.data?.find((it: Asset) => it.name.toLowerCase() === "zano")?.amount;

    return {
        initialPairs: userPairs?.success ? userPairs.data : [],
        walletData: walletData?.success ? walletData.data : null,
        assets: assets?.success ? assets.data : [],
        totalZanoUsd: totalZano && rate ? totalZano * rate?.usd : undefined,
        zanoUsd24Change: rate ? rate?.usd_24h_change : undefined,
    };
}

async function fetchUserPairs(token: string) {
    try {
        const response = await axios.post(
            `http://127.0.0.1:3000/api/pair/get-user-pairs`,
            { token }
        );

        return response.data;
    } catch (error) {
        return;
    }
}

async function fetchWalletData(token: string) {
    try {
        const response = await axios.post(
            `http://127.0.0.1:3000/api/user/get-user-info`,
            { token }
        );

        return response.data;
    } catch (error) {
        return;
    }
}

export async function fetchUserAssets(token: string) {
    try {
        const response = await axios.post(
            "http://127.0.0.1:3000/api/pair/get-user-assets", 
            { token });

        return response.data;
    } catch (error: any) {
        return error?.response?.data;
    }
}

export async function fetchZanoRate() {
    try {
        const response = await axios.get("https://explorer.zano.org/api/price");

        return response?.data?.data?.zano;
    } catch (error) {
        return;
    }
}