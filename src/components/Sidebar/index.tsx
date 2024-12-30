"use client";
import React, { useState } from 'react';
import styles from "./styles.module.scss";
import Image from 'next/image';
import CopyIcon from "@/assets/img/icons/copy.svg";
import LogoutIcon from "@/assets/img/icons/logout.svg";
import { classes, copyToClipboard } from '@/utils';
import InfoIcon from '../UI/InfoIcon';
import User from '@/interfaces/User';
import { logout } from '@/utils/utils';
import { Asset } from '@/interfaces/Asset';
import getAssetIcon from '../AssetIcon';

// Trading page sidebar
const Sidebar = ({ 
        walletData, 
        assets,
        totalZanoUsd,
        zanoUsd24Change,
    }: { 
        walletData: User, 
        assets: Asset[],  
        totalZanoUsd?: number,
        zanoUsd24Change?: number,
    }) => {
    const [isCopied, setCopied] = useState(false);

    // On copy address
    const onCopy = () => {
        setCopied(true);
        copyToClipboard(walletData?.address);

        setTimeout(() => {
            setCopied(false);
        }, 1500);
    }

    return (
        <aside className={styles.sidebar}>
            <div>
                <div className={styles.sidebar__item}>
                    <Image className={styles.sidebar__logo} width={160} height={50} src="/logo.svg" alt='bandit logo' />
                </div>

                <div className={classes(styles.sidebar__info, styles.sidebar__item)}>
                    <div className={styles.sidebar__info_avatar}>{walletData?.alias.slice(0, 1)}</div>
                    <div className={styles.sidebar__info_alias}>
                        <p className={styles.name}>@{walletData?.alias}</p>

                        <div className={styles.address}>
                            <span>{walletData?.address.slice(0, 6)}...{walletData?.address.slice(-6)}</span>

                            <InfoIcon onClick={onCopy} Icon={CopyIcon} info={isCopied ? "The address coppied" : "Copy address"} RightIcon={<CopyIcon className={styles.copyIcon} />} />
                        </div>
                    </div>
                </div>

                <div className={classes(styles.sidebar__balance, styles.sidebar__item)}>
                    <h5>Total Balance</h5>
                    <p>
                        <span className={styles.sidebar__balance_currency}>$</span>
                        <span className={styles.sidebar__balance_total}>{ totalZanoUsd?.toFixed(2).toLocaleString() }</span>
                        <span className={classes(styles.sidebar__balance_status,
                            (Number(zanoUsd24Change) < 0) && styles.sidebar__balance_status_negative
                        )}>{ zanoUsd24Change?.toFixed(2) }%</span>
                    </p>
                </div>

                <div className={styles.sidebar__item}>
                    {
                        assets.map((asset, id) => (
                            <div key={id} className={styles.sidebar__coins_item}>
                                <div>{getAssetIcon(asset.ticker.toUpperCase())}</div>
                                
                                <div className={styles.sidebar__coins_item_asset}>
                                    <span>{(Number(asset.amount).toFixed(6)).toLocaleString()}</span>
                                    <span>{asset.ticker.toUpperCase()}</span>
                                </div>
                                <span>{}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={styles.sidebar__bottom}>
                <button onClick={logout}>
                    <LogoutIcon /> Logout
                </button>
            </div>
        </aside>
    )
}

export default Sidebar