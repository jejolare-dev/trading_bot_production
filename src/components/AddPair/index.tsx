'use client';

import { useCallback, useState } from 'react';
import { classes } from '@/utils';
import CloseIcon from '@/assets/img/icons/x.svg';
import { AddPairData } from '@/interfaces/Pair';
import { debounce } from '@/utils/utils';
import { validateTokensInput } from 'zano_web3/shared';
import Popup from '../UI/Popup';
import styles from './styles.module.scss';
import { AddPairTypes } from './types';
import AddNewPair from './components/AddNewPair';
import CreatePair from './components/EditPair';

const AddPair = ({ isOpen, setIsOpen, setPairs, updatedPair, setUpdatedPair }: AddPairTypes) => {
    // Pairs component
    const Pairs = () => {
        const [type, setType] = useState<'buy' | 'sell'>('buy');
        const [pairData, setPairData] = useState<AddPairData | null>();
        const [priceStroke, setPriceStroke] = useState('');
        const [amountStroke, setAmountStroke] = useState('');
        const [pairUrl, setPairUrl] = useState('');
        const [lastProcessedUrl, setLastProcessedUrl] = useState('');

        // Tab
        const ModalTab = useCallback(() => {
            return (
                <div className={styles.modal__tabs}>
                    <button
                        onClick={() => setType('buy')}
                        className={classes(styles.buy, type === 'buy' && styles.active)}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => setType('sell')}
                        className={classes(styles.sell, type === 'sell' && styles.active)}
                    >
                        Sell
                    </button>
                </div>
            );
        }, [type]);

        const debouncedPriceCheck = debounce((price: string) => {
            const result = validateTokensInput(price);

            if (!result.valid) {
                setPriceStroke(result?.error || 'Invalid input');
            } else {
                setPriceStroke('');
            }

            return Boolean(result?.valid);
        }, 100);

        const debouncedAmountCheck = debounce((amount: string) => {
            const result = validateTokensInput(amount);

            if (!result.valid) {
                setAmountStroke(result?.error || 'Invalid input');
            } else {
                setAmountStroke('');
            }

            return Boolean(result?.valid);
        }, 100);

        return (
            <div className={styles.modal}>
                <button onClick={() => setIsOpen(false)} className={styles.modal__close}>
                    <CloseIcon />
                </button>

                <h3 className={styles.modal__title}>
                    {updatedPair ? 'Edit trading pair' : 'Add new trading pair'}
                </h3>

                <ModalTab />

                {updatedPair ? (
                    <CreatePair
                        setIsOpen={setIsOpen}
                        setType={setType}
                        setUpdatedPair={setUpdatedPair}
                        type={type}
                        updatedPair={updatedPair}
                        setPairs={setPairs}
                        priceStroke={priceStroke}
                        amountStroke={amountStroke}
                        debouncedPriceCheck={debouncedPriceCheck}
                        debouncedAmountCheck={debouncedAmountCheck}
                    />
                ) : (
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
                        priceStroke={priceStroke}
                        amountStroke={amountStroke}
                        debouncedPriceCheck={debouncedPriceCheck}
                        debouncedAmountCheck={debouncedAmountCheck}
                    />
                )}
            </div>
        );
    };

    return (
        <>
            {isOpen && (
                <Popup
                    Content={Pairs}
                    close={() => {
                        setIsOpen(false);
                        setUpdatedPair(null);
                    }}
                    settings={{}}
                    blur
                />
            )}
        </>
    );
};

export default AddPair;
