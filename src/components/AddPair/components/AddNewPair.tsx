import Button from "@/components/UI/Button";
import { getLastCopiedText } from "@/utils";
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import styles from "../styles.module.scss";
import CloseIcon from "@/assets/img/icons/x.svg";
import Pair, { AddPairData } from "@/interfaces/Pair";
import { debounce, urlParser } from "@/utils/utils";
import { Decimal } from 'decimal.js';
import PairApi from "@/api/PairApi";
import Preloader from "@/components/Preloader";
import getAssetIcon from "@/components/AssetIcon";

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
    priceStroke: string;
    amountStroke: string;
    debouncedPriceCheck: (price: string) => void;
    debouncedAmountCheck: (amount: string) => void;
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
    priceStroke,
    amountStroke,
    debouncedPriceCheck,
    debouncedAmountCheck,
}: AddNewPairTypes) => {
    const [message, setMessage] = useState(pairUrl);
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isValidatingInput, setIsValidatingInput] = useState(false);

    const handleGetCopiedText = async () => {
        const text = await getLastCopiedText();

        setMessage(text);
        debouncedFetchPairData(text);
    };

    const fetchPairData = useCallback(
        async (url: string) => {
            if (!url.length || lastProcessedUrl === url || !urlParser(url)) return;

            setIsLoading(true);
            setIsValidatingInput(true);

            try {
                const res = await PairApi.getPairData(url);

                if (res.success) {
                    const { rate, volume, first_currency, second_currency } = res.data;

                    if (rate && volume && first_currency && second_currency) {
                        const baseCurrency = second_currency?.name.toLowerCase() === "zano" 
                            ? second_currency 
                            : first_currency;
                        const quoteCurrency = second_currency?.name.toLowerCase() === baseCurrency?.name.toLowerCase()
                            ? first_currency 
                            : second_currency;

                        setPairUrl(url);
                        setPairData({
                            type: type || "buy",
                            price: first_currency?.name === baseCurrency?.name ? volume : rate,
                            amount: first_currency?.name === baseCurrency?.name ? rate : volume,
                            active: true,
                            baseCurrency: baseCurrency?.name,
                            quoteCurrency: quoteCurrency?.name,
                        });

                        setLastProcessedUrl(url);
                    }
                    
                    setIsLoading(false);
                }
            } catch (error) { 
                setIsLoading(false);
            }
        },
        [lastProcessedUrl, setPairData, setLastProcessedUrl]
    );

    const debouncedFetchPairData = debounce(fetchPairData, 300);

    const onAdd = async () => {
        if (!pairData) return;

        try {
            const res = await PairApi.addPair({
                ...pairData,
                amount: amount.toString(),
                price: price.toString(),
                type
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

    useEffect(() => {
        if (pairData) {
            setAmount(pairData.amount);
            setPrice(pairData.price);
        }
    }, [pairData]);

    useEffect(() => {
        debouncedPriceCheck(price.toString());
    }, [price]);

    useEffect(() => {
        debouncedAmountCheck(amount.toString());
    }, [amount]);

    useEffect(() => {
        setIsValidatingInput(false);
    }, [amountStroke, priceStroke]);

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

            {pairData && !isLoading && <div className={styles.modal__pairInfo}>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        {getAssetIcon(pairData.baseCurrency)} 
                        <span>Price</span>
                    </div>
                    <div className={styles.modal__textfield_input}>
                        <input value={price} type="number" onChange={(e) => setPrice(e.target?.value || "")}/>
                        <span>{ pairData.baseCurrency }</span>
                    </div>

                    {priceStroke && !isValidatingInput && (<span className={styles.stroke}>{priceStroke}</span>)}
                </div>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        {getAssetIcon(pairData.quoteCurrency)} 
                        <span>Amount</span>
                    </div>
                    <div className={styles.modal__textfield_input}>
                        <input value={amount} type="number" onChange={(e) => setAmount(e.target.value)}/>
                        <span>{pairData.quoteCurrency}</span>
                    </div>

                    {amountStroke && !isValidatingInput && (<span className={styles.stroke}>{amountStroke}</span>)}
                </div>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        {getAssetIcon(pairData.baseCurrency)} 
                        <span>Total</span>
                    </div>
                    <div className={styles.info}>
                        <p>{ (new Decimal(amount || 0).times(price || 0)).toString() }</p>
                        <span>{ pairData.baseCurrency }</span>
                    </div>
                </div>
            </div>}

            {isLoading && <Preloader />}

            <Button 
                onClick={onAdd} 
                className={styles.modal__btn} 
                disabled={!pairUrl || Boolean(amountStroke || priceStroke)} 
                width="100%">
                    Add
            </Button>
        </>
    )
};

export default AddNewPair;