import { ReactNode } from 'react';

import clsx from 'clsx';

import Header from './header';

import styles from './layout.module.scss';

export type LayoutProps = {
  children: ReactNode;
  disableScroll?: boolean;
  title: string;
};

const Layout = ({ children, disableScroll, title }: LayoutProps) => (
  <div
    className={clsx(styles.container, {
      [styles.disableScroll]: disableScroll,
    })}
  >
    <Header title={title} />
    <main className={styles.main}>{children}</main>
    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
      </a>
    </footer>
  </div>
);

export default Layout;
