import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Button from '@/components/UI/Button';
import Pair from '@/interfaces/Pair';
import Decimal from 'decimal.js';
import PairApi from '@/api/PairApi';
import getAssetIcon from '@/components/AssetIcon';
import styles from '../styles.module.scss';

interface CreatePairTypes {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setType: Dispatch<SetStateAction<'buy' | 'sell'>>;
    setUpdatedPair: Dispatch<SetStateAction<Pair | null>>;
    type: string;
    updatedPair: Pair;
    setPairs: Dispatch<SetStateAction<Pair[]>>;
    priceStroke: string;
    amountStroke: string;
    debouncedPriceCheck: (price: string) => void;
    debouncedAmountCheck: (amount: string) => void;
}

const EditPair = ({
    setIsOpen,
    setType,
    setUpdatedPair,
    type,
    updatedPair,
    setPairs,
    priceStroke,
    amountStroke,
    debouncedPriceCheck,
    debouncedAmountCheck,
}: CreatePairTypes) => {
    const [amount, setAmount] = useState(updatedPair?.amount || '');
    const [price, setPrice] = useState(updatedPair?.price || '');

    const onEditPair = async () => {
        if (!updatedPair) return;

        try {
            const res = await PairApi.editPair({
                id: updatedPair?.id,
                price,
                amount,
                type,
            });

            if (res.success) {
                setPairs((prev) =>
                    prev.map((it: Pair) => {
                        if (it.id === updatedPair.id) {
                            return {
                                ...it,
                                price,
                                amount,
                                type,
                            };
                        }

                        return it;
                    }),
                );
                setUpdatedPair(null);
                setIsOpen(false);
                setType('buy');
            }
        } catch {
            return undefined;
        }
    };

    useEffect(() => {
        debouncedPriceCheck(price);
    }, [price]);

    useEffect(() => {
        debouncedAmountCheck(amount);
    }, [amount]);

    return (
        <>
            <div className={styles.modal__pairInfo}>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        {getAssetIcon(updatedPair.baseCurrency)}
                        <span>Price</span>
                    </div>
                    <div className={styles.modal__textfield_input}>
                        <input
                            value={price}
                            type="number"
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <span>{updatedPair.baseCurrency}</span>
                    </div>

                    {priceStroke && <span className={styles.stroke}>{priceStroke}</span>}
                </div>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        {getAssetIcon(updatedPair.quoteCurrency)}
                        <span>Amount</span>
                    </div>
                    <div className={styles.modal__textfield_input}>
                        <input
                            value={amount}
                            type="number"
                            onChange={(e) => setAmount(e.target.value)}
                        />
                        <span>{updatedPair.quoteCurrency}</span>
                    </div>

                    {amountStroke && <span className={styles.stroke}>{amountStroke}</span>}
                </div>
                <div className={styles.modal__pairInfo_item}>
                    <div className={styles.title}>
                        {getAssetIcon(updatedPair.baseCurrency)}
                        <span>Total</span>
                    </div>
                    <div className={styles.info}>
                        <p>{new Decimal(amount || 0).times(price || 0).toString()}</p>
                        <span>{updatedPair.baseCurrency}</span>
                    </div>
                </div>
            </div>

            <Button
                onClick={onEditPair}
                className={styles.modal__btn}
                disabled={Boolean(amountStroke || priceStroke)}
                width="100%"
            >
                Edit
            </Button>
        </>
    );
};

export default EditPair;
