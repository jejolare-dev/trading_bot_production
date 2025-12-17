'use client';

import useTokenValidation from '@/hooks/useTokenValidation';
import styles from './styles.module.scss';

const MessageBanner = ({ message }: { message: string }) => {
    useTokenValidation();

    return (
        <div className={styles.container}>
            <h1>{message}</h1>
        </div>
    );
};

export default MessageBanner;
