import { Background } from '@/components/Background';
import React from 'react';
import styles from "./page.module.scss";
import Image from 'next/image';
import ConnectCard from '@/components/ConnectCard';

// Home page
const Home = () => {
  return (
    <div className={styles.wrapper}>
      <Background />

      <Image width={160} height={50} className={styles.logo} src="/logo.svg" alt='bandit logo' />

      <main>
        {/* Connect wallet card */}
        <ConnectCard />
      </main>

      <footer className={styles.footer}><p>Copyright © 2024 bandit.city</p></footer>
    </div>
  );
};

export default Home;