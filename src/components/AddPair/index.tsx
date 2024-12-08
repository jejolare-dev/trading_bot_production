"use client";
import { useCallback, useState } from "react";
import Popup from "../UI/Popup";
import styles from "./styles.module.scss";
import { classes } from "@/utils";
import { AddPairTypes } from "./types";
import AddNewPair from "./components/AddNewPair";
import CreatePair from "./components/CreatePair";
import CloseIcon from "@/assets/img/icons/x.svg";

const AddPair = ({ isOpen, setIsOpen }: AddPairTypes) => {
    const [type, setType] = useState<"buy" | "sell">("buy");
    const [isPairAdded, setIsPairAdded] = useState(false);

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

                <h3 className={styles.modal__title}>{isPairAdded ? "Create new trading pair" : "Add new trading pair"}</h3>

                <ModalTab />

                {isPairAdded ?
                    <CreatePair
                        setIsOpen={setIsOpen}
                        setIsPairAdded={setIsPairAdded}
                        setType={setType}
                    /> :
                    <AddNewPair
                        setIsPairAdded={setIsPairAdded}
                    />}
            </div>
        );
    }, [isPairAdded, ModalTab, setIsOpen]);

    return (
        <>
            {isOpen && <Popup Content={Pairs} close={() => setIsOpen(false)} settings={{}} blur />}
        </>
    )
}

export default AddPair