import { ReactNode } from 'react';

import clsx from 'clsx';

import { Header, PageTitle } from '~/components';
import { ConfirmationDialogContextProvider } from '~/contexts';

import styles from './Layout.module.scss';

export type LayoutProps = {
  children: ReactNode;
  disableScroll?: boolean;
  title: string;
  isAuthenticated: boolean;
};

const Layout = ({ children, disableScroll, title, isAuthenticated }: LayoutProps) => (
  <div
    className={clsx(styles.root, {
      [styles.disableScroll]: disableScroll,
    })}
  >
    <PageTitle title={title} />
    <Header isAuthenticated={isAuthenticated} />
    <main className={styles.main}>
      <ConfirmationDialogContextProvider>{children}</ConfirmationDialogContextProvider>
    </main>
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
