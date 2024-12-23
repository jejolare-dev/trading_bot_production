"use client";
import { useCallback, useEffect, useState } from "react";
import Popup from "../UI/Popup";
import styles from "./styles.module.scss";
import { classes } from "@/utils";
import { AddPairTypes } from "./types";
import AddNewPair from "./components/AddNewPair";
import CreatePair from "./components/EditPair";
import CloseIcon from "@/assets/img/icons/x.svg";
import { AddPairData } from "@/interfaces/Pair";

const AddPair = ({ 
    isOpen, 
    setIsOpen,
    setPairs,
    updatedPair,
    setUpdatedPair,
 }: AddPairTypes) => {
    const [type, setType] = useState<"buy" | "sell">("buy");
    const [pairData, setPairData] = useState<AddPairData | null>();
    const [pairUrl, setPairUrl] = useState("");
    const [lastProcessedUrl, setLastProcessedUrl] = useState("");

    useEffect(() => {
        setPairData(null);
        setPairUrl("");
        setLastProcessedUrl("");
    }, [type, isOpen]);

    // Tab
    const ModalTab = useCallback(() => {
        return (
            <div className={styles.modal__tabs}>
                <button onClick={() => setType("buy")} className={classes(styles.buy, type == "buy" && styles.active)}>Buy</button>
                <button onClick={() => setType("sell")} className={classes(styles.sell, type == "sell" && styles.active)}>Sell</button>
            </div>
        )
    }, [type]);

    // Pairs component
    const Pairs = useCallback(() => {
        return (
            <div className={styles.modal}>
                <button onClick={() => setIsOpen(false)} className={styles.modal__close}><CloseIcon /></button>

                <h3 className={styles.modal__title}>{updatedPair ? "Edit trading pair" : "Add new trading pair"}</h3>

                <ModalTab />

                {updatedPair ?
                    <CreatePair
                        setIsOpen={setIsOpen}
                        setType={setType}
                        setUpdatedPair={setUpdatedPair}
                        type={type}
                        updatedPair={updatedPair}
                        setPairs={setPairs}
                    /> :
                    <AddNewPair
                        type={type}
                        setPairData={setPairData}
                        pairData={pairData}
                        setPairUrl={setPairUrl}
                        pairUrl={pairUrl}
                        setLastProcessedUrl={setLastProcessedUrl}
                        lastProcessedUrl={lastProcessedUrl}
                        setIsOpen={setIsOpen}
                        setPairs={setPairs}
                    />}
            </div>
        );
    }, [updatedPair, ModalTab, setIsOpen, pairData, pairUrl]);

    return (
        <>
            {isOpen && 
                <Popup 
                    Content={Pairs} 
                    close={() => {
                        setIsOpen(false);
                        setUpdatedPair(null);
                    }} 
                    settings={{}} 
                    blur />
            }
        </>
    )
}

export default AddPair