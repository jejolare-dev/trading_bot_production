import styles from "./styles.module.scss";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Trading from "@/components/Trading/Trading";
import axios from "axios";

const TradingPage = async () => {
    const { initialPairs, walletData, assets } = await fetchInitialData();

    return (
        <main className={styles.container}>
            <Trading 
                initialPairs={initialPairs} 
                walletData={walletData} 
                assets={assets} />
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

    if (!assets?.success) {
        redirect("/incorrect-setup");
    }

    return {
        initialPairs: userPairs?.success ? userPairs.data : [],
        walletData: walletData?.success ? walletData.data : null,
        assets: assets.data,
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
        return;
    }
}