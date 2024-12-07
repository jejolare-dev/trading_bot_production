"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

// Device width checker
const MobileNotAvailable: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 1200);
    }, []);

    if (isMobile) {
        return <div className={styles.notAvailable}>
            <h1>Trading bot is not available from mobile device!</h1>
        </div>
    }

    return <></>;
};

export default MobileNotAvailable;
