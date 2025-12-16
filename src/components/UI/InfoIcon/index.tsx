import { InfoIconTypes } from './types';
import styles from './styles.module.scss';

// Info tooltip icon component
const InfoIcon = ({ Icon, info, RightIcon, onClick }: InfoIconTypes) => {
    return (
        <div onClick={onClick} className={styles.tooltip}>
            <Icon className={styles.tooltip__icon} />

            {
                <div className={styles.tooltip__info}>
                    {RightIcon && RightIcon} <span>{info}</span>
                </div>
            }
        </div>
    );
};

export default InfoIcon;
