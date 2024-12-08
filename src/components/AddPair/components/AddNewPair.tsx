import Button from "@/components/UI/Button";
import { getLastCopiedText } from "@/utils";
import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "../styles.module.scss";
import BitcoinIcon from "@/assets/img/icons/btc.svg";
import ZanoIcon from "@/assets/img/icons/zano.svg";
import CloseIcon from "@/assets/img/icons/x.svg";

interface AddNewPairTypes {
    setIsPairAdded: Dispatch<SetStateAction<boolean>>;
}

const AddNewPair = ({ setIsPairAdded }: AddNewPairTypes) => {
    const [pairUrl, setPairUrl] = useState("");

    // Paste copied text
    const handleGetCopiedText = async () => {
        const text = await getLastCopiedText();
        setPairUrl(text);
    };

    return (
        <>
            {/* Input for pair url */}
            <div className={styles.modal__textfield}>
                <label htmlFor="zano-trade-url">Trading Pair URL</label>

                <div className={styles.modal__textfield_input}>
                    <input value={pairUrl} onChange={(e) => setPairUrl(e.target.value)} id="zano-trade-url" type="text" placeholder="Zano Trade URL..." />
                    {pairUrl ?
                        <button onClick={() => setPairUrl("")}><CloseIcon /></button>
                        :
                        <button onClick={handleGetCopiedText}>Paste</button>
                    }
                </div>

                {pairUrl && <p>The pair found!</p>}
            </div>

            {pairUrl && <div className={styles.modal__pairInfo}>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <BitcoinIcon /> <span>Price</span>
                    </div>
                    <div className={styles.info}>
                        <p>0,01</p>
                        <span>BTC</span>
                    </div>
                </div>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <ZanoIcon /> <span>Amount</span>
                    </div>
                    <div className={styles.info}>
                        <p>125</p>
                        <span>ZANO</span>
                    </div>
                </div>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <BitcoinIcon /> <span>Total</span>
                    </div>
                    <div className={styles.info}>
                        <p>0,125125</p>
                        <span>BTC</span>
                    </div>
                </div>
            </div>}

            <Button onClick={() => setIsPairAdded(true)} className={styles.modal__btn} disabled={!pairUrl} width="100%">Add</Button>
        </>
    )
};

export default AddNewPair;