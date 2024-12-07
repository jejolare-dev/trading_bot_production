"use client"
import React from 'react';
import styles from "./styles.module.scss";
import Image from 'next/image';
import InfoIcon from "@/assets/img/icons/info.svg";
import Button from '../UI/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Home page connect wallet card
const ConnectCard = () => {
    const router = useRouter();

    const onWalletConnect = () => {
        router.push("/trading");
    }

    return (
        <div className={styles.card}>
            <Image className={styles.card__img} width={128} height={128} src="/bandit-icon.svg" alt="bandit" />

            <h1 className={styles.card__title}>Trading bot</h1>

            <p className={styles.card__desc}>Welcome to Bandit City, the digital realm where privacy isn&apos;t just an option, it&apos;s the foundation. </p>

            <Button onClick={onWalletConnect} width='100%'>Connect with Zano Wallet</Button>

            <Link href="https://docs.zano.org/docs/use/companion/" target='_blank' className={styles.card__info}><InfoIcon /> How to connect<span className='nofont'>?</span></Link>
        </div>
    );
};

export default ConnectCard;