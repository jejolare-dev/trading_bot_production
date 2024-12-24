"use client";
import React, { useEffect, useState } from "react";
import MessageBanner from "../MessageBanner";

// Device width checker
const MobileNotAvailable: React.FC = () => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 1200);
    }, []);

    if (isMobile) {
        return <MessageBanner message={"Trading bot is not available from mobile device!"} />
    }

    return <></>;
};

export default MobileNotAvailable;
