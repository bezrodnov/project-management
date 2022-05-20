import { Box } from '@mui/material';

import clsx from 'clsx';

import { Header, PageTitle } from '~/components';

import { LayoutProps } from './Layout.types';

import styles from './Layout.module.scss';

const Layout = ({ children, disableScroll, title, isAuthenticated, sx, className }: LayoutProps) => (
  <div
    className={clsx(styles.root, {
      [styles.disableScroll]: disableScroll,
    })}
  >
    <PageTitle title={title} />
    <Header isAuthenticated={isAuthenticated} />
    <Box
      component="main"
      className={className}
      sx={{
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: disableScroll ? 'hidden' : undefined,
        overflowX: 'auto',
        ...sx,
      }}
    >
      {children}
    </Box>
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
