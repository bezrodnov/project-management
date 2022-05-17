import { ReactNode } from 'react';

import Head from 'next/head';

import clsx from 'clsx';

import { Header } from '~/components';

import styles from './Layout.module.scss';

export type LayoutProps = {
  children: ReactNode;
  disableScroll?: boolean;
  title: string;
  isAuthenticated: boolean;
};

const Layout = ({ children, disableScroll, title, isAuthenticated }: LayoutProps) => (
  <div
    className={clsx(styles.container, {
      [styles.disableScroll]: disableScroll,
    })}
  >
    <Head>
      <title>{title}</title>
    </Head>
    <Header isAuthenticated={isAuthenticated} />
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

export { Layout };
