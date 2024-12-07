"use client";
import { useState } from "react";
import Popup from "../UI/Popup";
import styles from "./styles.module.scss";
import { classes, getLastCopiedText } from "@/utils";
import Button from "../UI/Button";
import CloseIcon from "@/assets/img/icons/x.svg";
import BitcoinIcon from "@/assets/img/icons/btc.svg";
import BanditIcon from "@/assets/img/icons/bandit.svg";
import TetherIcon from "@/assets/img/icons/tether.svg";
import ZanoIcon from "@/assets/img/icons/zano.svg";
import ChangeIcon from "@/assets/img/icons/change.svg";
import Select from "../UI/Select";
import { OptionType } from "../UI/Select/types";
import { AddPairTypes } from "./types";

const AddPair = ({ isOpen, setIsOpen }: AddPairTypes) => {
    const [tabIndex, setTabIndex] = useState<"buy" | "sell">("buy");

    // Buy pair component
    const BuyPair = () => {
        const [pairUrl, setPairUrl] = useState("");

        // Paste copied text
        const handleGetCopiedText = async () => {
            const text = await getLastCopiedText();
            setPairUrl(text);
        };


        return (
            <div className={styles.modal}>
                <button onClick={() => setIsOpen(false)} className={styles.modal__close}><CloseIcon /></button>

                <h3 className={styles.modal__title}>Add new trading pair</h3>

                {/* Tab */}
                <div className={styles.modal__tabs}>
                    <button className={classes(styles.buy, styles.active)}>Buy</button>
                    <button onClick={() => setTabIndex("sell")} className={styles.sell}>Sell</button>
                </div>

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

                <Button className={styles.modal__btn} disabled={!pairUrl} width="100%">Add</Button>
            </div>
        )
    }

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
    ]

    // Sell pair component
    const SellPair = () => {
        const [selected, setSelected] = useState<OptionType>();

        return (
            <div className={styles.modal}>
                <button onClick={() => setIsOpen(false)} className={styles.modal__close}><CloseIcon /></button>

                <h3 className={styles.modal__title}>Create new trading pair</h3>

                <div className={styles.modal__tabs}>
                    <button onClick={() => setTabIndex("buy")} className={styles.buy}>Buy</button>
                    <button className={classes(styles.sell, styles.active)}>Sell</button>
                </div>

                <div className={classes(styles.modal__pairInfo, styles.sell)}>
                    <div className={styles.modal__pairInfo_item}>
                        <div className={styles.title}>
                            <BitcoinIcon /> <span>Amount</span>
                        </div>
                        <div className={styles.info}>
                            <p>0,01</p>

                            <Select isDark selected={selected} setSelected={setSelected} options={coinsList} />
                        </div>
                    </div>

                    <button className={styles.modal__pairInfo_change}><ChangeIcon /></button>

                    <div className={styles.modal__pairInfo_item}>
                        <div className={styles.title}>
                            <ZanoIcon /> <span>Price</span>
                        </div>
                        <div className={styles.info}>
                            <p>125</p>
                        </div>
                    </div>
                </div>

                <Button className={styles.modal__btn} width="100%">Create</Button>
            </div>
        )
    }

    // Pairs component
    const Pairs = () => {
        return tabIndex == "buy" ? <BuyPair /> : <SellPair />
    }

    return (
        <>
            {isOpen && <Popup Content={Pairs} close={() => setIsOpen(false)} settings={{}} blur />}
        </>
    )
}

export default AddPair