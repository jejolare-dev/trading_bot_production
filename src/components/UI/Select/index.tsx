'use client';

import ArrowDown from '@/assets/img/icons/arrow-down.svg';
import { classes } from '@/utils';
import { SelectType } from './types';
import styles from './styles.module.scss';

// Custom select component
const Select = ({ options, selected = options[0], setSelected, isDark = false }: SelectType) => {
    return (
        <div className={classes(styles.select, isDark && styles.dark)}>
            <button className={classes(styles.select__selected)}>
                <span>{selected.name}</span> <ArrowDown />
            </button>

            <div className={styles.select__dropdown}>
                {options.map((option, idx) => (
                    <label
                        onClick={() => setSelected(option)}
                        className={styles.select__dropdown_item}
                        key={idx}
                    >
                        <span>
                            {option.Icon && option.Icon} {option.name}
                        </span>
                        <input defaultChecked={selected === option} name="select" type="radio" />
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Select;
