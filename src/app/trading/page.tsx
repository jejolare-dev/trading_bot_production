"use client";
import React, { useState } from 'react';
import styles from "./styles.module.scss";
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Pairs from '@/components/Pairs';
import AddPair from '@/components/AddPair';

const Trading = () => {
    const [addPairModal, setAddPairModal] = useState(false);

    return (
        <main className={styles.container}>
            {/* Left sidebar */}
            <Sidebar />

            {/* Right content */}
            <div className={styles.content}>
                <Header setAddPairModal={setAddPairModal} />
                <Pairs setAddPairModal={setAddPairModal} />
            </div>

            {/* Add pair modal */}
            <AddPair isOpen={addPairModal} setIsOpen={setAddPairModal} />
        </main>
    )
}

export default Trading;