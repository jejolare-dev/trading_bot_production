"use client";
import styles from "./styles.module.scss";
import { OptionType } from '../UI/Select/types';
import Select from "../UI/Select";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { classes } from "@/utils";
import BanditIcon from "@/assets/img/icons/bandit.svg";
import ZanoIcon from "@/assets/img/icons/zano-symbol.svg";
import EditIcon from "@/assets/img/icons/edit.svg";
import DelIcon from "@/assets/img/icons/delete.svg";
import Toggle from "../UI/Toggle";
import Button from "../UI/Button";

// Filters data
const pairFilters: OptionType[] = [
    {
        name: "Show all",
        value: "all",
    },
    {
        name: "Active",
        value: "active",
    },
    {
        name: "Inactive",
        value: "inactive",
    }
]

// Test pairs data
interface PairType {
    id: number;
    order: string;
    orderType: "long" | "short";
    type: "buy" | "sell";
    amount: string;
    price: string;
    active: boolean;
}

const pairsData: PairType[] = [
    {
        id: 1,
        order: "BANDIT / ZANO",
        orderType: "long",
        type: "buy",
        amount: "10 000 BANDIT",
        price: "0,00 ZANO",
        active: true,
    },
    {
        id: 2,
        order: "BANDIT / ZANO",
        orderType: "long",
        type: "sell",
        amount: "25 000 BANDIT",
        price: "12,15212 ZANO",
        active: false,
    },
    {
        id: 3,
        order: "BANDIT / ZANO",
        orderType: "long",
        type: "sell",
        amount: "10 BANDIT",
        price: "100 ZANO",
        active: false,
    },
    {
        id: 4,
        order: "BANDIT / ZANO",
        orderType: "short",
        type: "buy",
        amount: "4 000 BANDIT",
        price: "15,00 ZANO",
        active: true,
    },
    {
        id: 5,
        order: "BANDIT / ZANO",
        orderType: "long",
        type: "buy",
        amount: "1, 000 BANDIT",
        price: "0,15 ZANO",
        active: false,
    },
    {
        id: 6,
        order: "BANDIT / ZANO",
        orderType: "short",
        type: "sell",
        amount: "10 000 BANDIT",
        price: "0,00 ZANO",
        active: true,
    },
    {
        id: 7,
        order: "BANDIT / ZANO",
        orderType: "long",
        type: "sell",
        amount: "10 BANDIT",
        price: "100 ZANO",
        active: false,
    },
    {
        id: 8,
        order: "BANDIT / ZANO",
        orderType: "short",
        type: "buy",
        amount: "4 000 BANDIT",
        price: "15,00 ZANO",
        active: true,
    },
    {
        id: 9,
        order: "BANDIT / ZANO",
        orderType: "long",
        type: "buy",
        amount: "1, 000 BANDIT",
        price: "0,15 ZANO",
        active: false,
    },
    {
        id: 10,
        order: "BANDIT / ZANO",
        orderType: "short",
        type: "sell",
        amount: "10 000 BANDIT",
        price: "0,00 ZANO",
        active: true,
    },
]

// Trading page pairs
const Pairs = ({ setAddPairModal }: { setAddPairModal: Dispatch<SetStateAction<boolean>> }) => {
    const [selected, setSelected] = useState<OptionType>();
    const [pairs, setPairs] = useState<PairType[] | undefined>(pairsData);

    // Toggle pair activity
    const togglePairActivity = (id: number) => {
        const changedPair = pairs?.map(pair =>
            pair.id === id ? { ...pair, active: !pair.active } : pair
        )

        setPairs(changedPair)
    }

    // Filtered pairs
    const filteredPairs = useCallback(() => {
        switch (selected?.value) {
            case "active":
                return pairs?.filter(pair => pair.active);
            case "inactive":
                return pairs?.filter(pair => !pair.active);
            default:
                return pairs
        }
    }, [selected, pairs])


    return (
        <div className={styles.pairs}>
            {/* Pairs header */}
            <div className={styles.pairs__header}>
                <h3>Pairs</h3>

                <Select selected={selected} setSelected={setSelected} options={pairFilters} />
            </div>

            {/* Pairs table */}
            <div className={styles.pairs__table}>
                <table>
                    <thead>
                        <tr>
                            <th className={styles.num}><span>#</span></th>
                            <th className={styles.order}><span>Orders</span></th>
                            <th className={styles.type}><span>Order Type</span></th>
                            <th className={styles.amount}><span>Amount</span></th>
                            <th className={styles.price}><span>Price</span></th>
                            <th className={styles.status}><span>Status</span></th>
                            <th className={styles.actions}><span>Actions</span></th>
                        </tr>
                    </thead>

                    {pairs?.length ?
                        <tbody>
                            {filteredPairs()?.map((e, idx) => (
                                <tr className={styles.body} key={e.id}>
                                    <td className={styles.num_item}>{idx + 1}</td>
                                    <td className={styles.order_item}><p>{e.order} <span className={styles[e.orderType]}>{e.orderType}</span></p></td>
                                    <td className={classes(styles.type_item, styles[e.type])}><span>{e.type}</span></td>
                                    <td className={styles.amount_item}><div><BanditIcon /> <span>{e.amount}</span></div></td>
                                    <td className={styles.price_item}><div><ZanoIcon /> <span>{e.price}</span></div></td>
                                    <td className={classes(styles.status_item, e.active && styles.active)}><span>{e.active ? "Active" : "Inactive"}</span></td>
                                    <td className={styles.actions_item}><div><Toggle value={e.active} onChange={() => togglePairActivity(e.id)} /> <button><DelIcon /></button> <button><EditIcon /></button></div></td>
                                </tr>
                            ))}
                        </tbody>
                        : <tbody></tbody>}
                </table>

                {/* No pairs */}
                {filteredPairs()?.length === 0 && <div className={styles.nopairs}>
                    <h5>There are no trading pairs yet</h5>
                    {pairs?.length == 0 && <Button onClick={() => setAddPairModal(true)} variant="success">+ Create one</Button>}
                </div>}
            </div>
        </div>
    )
}

export default Pairs