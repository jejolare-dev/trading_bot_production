import Button from "@/components/UI/Button";
import { getLastCopiedText } from "@/utils";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import styles from "../styles.module.scss";
import BitcoinIcon from "@/assets/img/icons/btc.svg";
import CloseIcon from "@/assets/img/icons/x.svg";
import Pair, { AddPairData } from "@/interfaces/Pair";
import { debounce, urlParser } from "@/utils/utils";
import { Decimal } from 'decimal.js';
import TradeIcon from "@/assets/img/icons/trade_tsds.svg";
import PairApi from "@/api/PairApi";

interface AddNewPairTypes {
    type: string;
    setPairData: Dispatch<SetStateAction<AddPairData | null | undefined>>;
    pairData?: AddPairData | null;
    setPairUrl: Dispatch<SetStateAction<string>>;
    pairUrl: string;
    setLastProcessedUrl: Dispatch<SetStateAction<string>>;
    lastProcessedUrl: string;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setPairs: Dispatch<SetStateAction<Pair[]>>,
}

const AddNewPair = ({
    type, 
    pairData, 
    setPairData,
    setPairUrl,
    pairUrl, 
    setLastProcessedUrl,
    lastProcessedUrl,
    setIsOpen,
    setPairs,
}: AddNewPairTypes) => {
    const [message, setMessage] = useState(pairUrl);
    const [amount, setAmount] = useState(new Decimal(pairData?.amount || 0));
    const [price, setPrice] = useState(new Decimal(pairData?.price || 0));

    const handleGetCopiedText = async () => {
        const text = await getLastCopiedText();

        setMessage(text);
        debouncedFetchPairData(text);
    };

    const fetchPairData = useCallback(
        async (url: string) => {
            if (!url.length || lastProcessedUrl === url || !urlParser(url)) return;

            try {
                const res = await PairApi.getPairData(url);

                if (res.success) {
                    const { rate, volume, first_currency, second_currency } = res.data;

                    setPairUrl(url);
                    setPairData({
                        type: type || "buy",
                        price: rate,
                        amount: volume,
                        active: true,
                        baseCurrency: first_currency?.name,
                        quoteCurrency: second_currency?.name,
                    });

                    setLastProcessedUrl(url);
                }
            } catch (error) {}
        },
        [lastProcessedUrl, setPairData, setLastProcessedUrl, type]
    );

    const debouncedFetchPairData = debounce(fetchPairData, 300);

    const onAdd = async () => {
        if (!pairData) return;

        try {
            const res = await PairApi.addPair({
                ...pairData,
                amount: amount.toString(),
                price: price.toString()
            });

            if (res.success) {
                setIsOpen(false);
                setPairs(prev => [...prev, res.data]);
            }
        } catch (error) {}
    }

    const onInput = async (event: React.FormEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;

        setMessage(value);
        debouncedFetchPairData(value);
    };

    return (
        <>
            {/* Input for pair url */}
            <div className={styles.modal__textfield}>
                <label htmlFor="zano-trade-url">Trading Pair URL</label>

                <div className={styles.modal__textfield_input}>
                    <input value={message} onInput={onInput} id="zano-trade-url" type="text" placeholder="Zano Trade URL..." />
                    {message ?
                        <button onClick={() => {
                            setPairUrl("");
                            setMessage("");
                        }}><CloseIcon /></button>
                        :
                        <button onClick={handleGetCopiedText}>Paste</button>
                    }
                </div>

                {pairData && <p>The pair found!</p>}
            </div>

            {pairData && <div className={styles.modal__pairInfo}>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <TradeIcon width={20} height={20} /> <span>Price</span>
                    </div>
                    <div className={styles.modal__textfield_input}>
                        <input value={price.toString()} type="number" onChange={(e) => setPrice(new Decimal(e.target.value || 0))}/>
                        <span>{ pairData.baseCurrency }</span>
                    </div>
                </div>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <TradeIcon width={20} height={20} /> <span>Amount</span>
                    </div>
                    <div className={styles.modal__textfield_input}>
                        <input value={amount.toString()} type="number" onChange={(e) => setAmount(new Decimal(e.target.value || 0))}/>
                        <span>{pairData.quoteCurrency}</span>
                    </div>
                </div>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        <BitcoinIcon /> <span>Total</span>
                    </div>
                    <div className={styles.info}>
                        <p>{ amount.times(price).toString() }</p>
                        <span>{ pairData.quoteCurrency }</span>
                    </div>
                </div>
            </div>}

            <Button onClick={onAdd} className={styles.modal__btn} disabled={!pairUrl} width="100%">Add</Button>
        </>
    )
};

export default AddNewPair;