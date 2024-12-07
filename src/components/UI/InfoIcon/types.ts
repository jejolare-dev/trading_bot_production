import React from "react";

export interface InfoIconTypes {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    info: string;
    RightIcon?: React.ReactNode;
    onClick?: () => void;
}