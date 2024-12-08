import { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles.module.scss";
import { OptionType } from "@/components/UI/Select/types";
import { classes } from "@/utils";
import Select from "@/components/UI/Select";
import Button from "@/components/UI/Button";
import BitcoinIcon from "@/assets/img/icons/btc.svg";
import ZanoIcon from "@/assets/img/icons/zano.svg";
import ChangeIcon from "@/assets/img/icons/change.svg";
import TetherIcon from "@/assets/img/icons/tether.svg";
import BanditIcon from "@/assets/img/icons/bandit.svg";

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
    setIsPairAdded: Dispatch<SetStateAction<boolean>>;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setType: Dispatch<SetStateAction<"buy" | "sell">>;
}

const CreatePair = ({ setIsOpen, setType, setIsPairAdded }: CreatePairTypes) => {
    const [selected, setSelected] = useState<OptionType>();

    // On create pair
    const onCreatePair = () => {
        setIsOpen(false);
        setIsPairAdded(false);
        setType("buy");
    };

    // Toggle buy/sell changer
    const toggleChange = () => {
        setType((prevType) => prevType === "buy" ? "sell" : "buy");
    }

    return (
        <>
            <div className={classes(styles.modal__pairInfo, styles.sell)}>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <BitcoinIcon /> <span>Amount</span>
                    </div>
                    <div className={styles.info}>
                        <input type="number" placeholder="amount" defaultValue={0.01} />

                        <Select isDark selected={selected} setSelected={setSelected} options={coinsList} />
                    </div>
                </div>

                <button onClick={toggleChange} className={styles.modal__pairInfo_change}><ChangeIcon /></button>

                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <ZanoIcon /> <span>Price</span>
                    </div>
                    <div className={classes(styles.info, styles.price)}>
                        <input type="number" placeholder="price" defaultValue={125} />
                    </div>
                </div>
            </div>

            <Button onClick={onCreatePair} className={styles.modal__btn} width="100%">Create</Button>
        </>
    )
}

export default CreatePair;