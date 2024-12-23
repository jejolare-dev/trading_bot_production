import { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles.module.scss";
import { OptionType } from "@/components/UI/Select/types";
import Button from "@/components/UI/Button";
import BitcoinIcon from "@/assets/img/icons/btc.svg";
import TetherIcon from "@/assets/img/icons/tether.svg";
import BanditIcon from "@/assets/img/icons/bandit.svg";
import TradeIcon from "@/assets/img/icons/trade_tsds.svg";
import Pair from "@/interfaces/Pair";
import Decimal from "decimal.js";
import PairApi from "@/api/PairApi";

// Filters data
const coinsList: OptionType[] = [
    {
        name: "BTC",
        value: "btc",
        Icon: <BitcoinIcon />
    },
    {
        name: "BANDIT",
        value: "bandit",
        Icon: <BanditIcon />
    },
    {
        name: "USDT",
        value: "usdt",
        Icon: <TetherIcon />
    }
];

interface CreatePairTypes {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setType: Dispatch<SetStateAction<"buy" | "sell">>;
    setUpdatedPair: Dispatch<SetStateAction<Pair | null>>;
    type: string;
    updatedPair: Pair;
    setPairs: Dispatch<SetStateAction<Pair[]>>;
}

const EditPair = ({ 
    setIsOpen, 
    setType, 
    setUpdatedPair, 
    type, 
    updatedPair,
    setPairs,
 }: CreatePairTypes) => {
    const [amount, setAmount] = useState(new Decimal(updatedPair?.amount || 0));
    const [price, setPrice] = useState(new Decimal(updatedPair?.price || 0));

    const onEditPair = async () => {
        if (!updatedPair) return;

        try {
            const res = await PairApi.editPair({
                id: updatedPair?.id, 
                price: price.toString(),
                amount: amount.toString(),
                type
            });

            if (res.success) {
                setPairs(prev => prev.map((it: Pair) => {
                    if (it.id === updatedPair.id) {
                        return {
                            ...it,
                            price: price.toString(),
                            amount: amount.toString(),
                            type
                        }
                    }

                    return it;
                }));
                setUpdatedPair(null);
                setIsOpen(false);
                setType("buy");
            }
        } catch (error) {
            
        }
    };

    // Toggle buy/sell changer
    const toggleChange = () => {
        setType((prevType) => prevType === "buy" ? "sell" : "buy");
    }

    return (
        <>
            <div className={styles.modal__pairInfo}>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <TradeIcon width={20} height={20} /> <span>Price</span>
                    </div>
                    <div className={styles.modal__textfield_input}>
                        <input value={price.toString()} type="number" onChange={(e) => setPrice(new Decimal(e.target.value || 0))}/>
                        <span>{ updatedPair.baseCurrency }</span>
                    </div>
                </div>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <TradeIcon width={20} height={20} /> <span>Amount</span>
                    </div>
                    <div className={styles.modal__textfield_input}>
                        <input value={amount.toString()} type="number" onChange={(e) => setAmount(new Decimal(e.target.value || 0))}/>
                        <span>{updatedPair.quoteCurrency}</span>
                    </div>
                </div>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <BitcoinIcon /> <span>Total</span>
                    </div>
                    <div className={styles.info}>
                        <p>{ amount.times(price).toString() }</p>
                        <span>{ updatedPair.quoteCurrency }</span>
                    </div>
                </div>
            </div>

            <Button onClick={onEditPair} className={styles.modal__btn} width="100%">Edit</Button>
        </>
    )
}

export default EditPair;