import React, { Dispatch, SetStateAction } from 'react';
import Button from '../UI/Button';
import styles from "./styles.module.scss";
import InfoOutlineIcon from "@/assets/img/icons/info-outline.svg";
import InfoIcon from '../UI/InfoIcon';

// Trading page header
const Header = ({ setAddPairModal }: { setAddPairModal: Dispatch<SetStateAction<boolean>> }) => {
    return (
        <header className={styles.header}>
            <div className={styles.header__top}>
                <h1 className={styles.header__top_title}>Trading Bot</h1>
                <Button onClick={() => setAddPairModal(true)} variant='success'>+ Add trading pair</Button>
            </div>

            <div className={styles.header__info}>
                <div className={styles.header__info_card}>
                    <h5>Realized PnL <InfoIcon Icon={InfoOutlineIcon} info='Realized PnL' /></h5>
                    <p>+ 124.21 USD</p>
                </div>

                <div className={styles.header__info_card}>
                    <h5>Deals <InfoIcon Icon={InfoOutlineIcon} info='Deals' /></h5>
                    <p>0%</p>
                </div>

                <div className={styles.header__info_card}>
                    <h5>APY <InfoIcon Icon={InfoOutlineIcon} info='APY' /></h5>
                    <p>2</p>
                </div>

                <div className={styles.header__info_card}>
                    <h5>All Time PnL <InfoIcon Icon={InfoOutlineIcon} info='All Time PnL' /></h5>
                    <p>1.58%</p>
                </div>
            </div>
        </header>
    )
}

export default Header