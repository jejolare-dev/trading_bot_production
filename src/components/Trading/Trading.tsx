"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Pairs from "../Pairs";
import AddPair from "../AddPair";
import Pair from "@/interfaces/Pair";
import { Wallet } from "zano_web3/web";
import { Asset } from "@/interfaces/Asset";
import AuthApi from "@/api/AuthApi";
import { logout } from "@/utils/utils";
import { useRouter } from "next/navigation";
import useTokenValidation from "@/hooks/useTokenValidation";

const Trading = ({ initialPairs, walletData, assets }: { 
    initialPairs: Pair[], 
    walletData: Wallet,
    assets: Asset[]
}) => {
    const [addPairModal, setAddPairModal] = useState(false);
    const [pairs, setPairs] = useState(initialPairs);
    const [updatedPair, setUpdatedPair] = useState<Pair | null>(null);
    
    useTokenValidation();

    return (
        <>
            {/* Left sidebar */}
            <Sidebar walletData={walletData} assets={assets} />

            {/* Right content */}
            <div className={styles.content}>
                <Header setAddPairModal={setAddPairModal} />
                <Pairs 
                    setAddPairModal={setAddPairModal} 
                    pairs={pairs} 
                    setPairs={setPairs}
                    setUpdatedPair={setUpdatedPair}
                    />
            </div>

            {/* Add pair modal */}
            <AddPair 
                updatedPair={updatedPair}
                setUpdatedPair={setUpdatedPair}
                isOpen={addPairModal} 
                setIsOpen={setAddPairModal}
                setPairs={setPairs} />
        </>
    )
}

export default Trading;