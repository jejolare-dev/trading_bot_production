import React from 'react';

export interface OptionType {
    value: string;
    name: string;
    Icon?: React.ReactNode;
}

export interface SelectType {
    options: OptionType[];
    selected: OptionType | undefined;
    setSelected: (val: OptionType) => void;
    isDark?: boolean;
}
