import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { SnackbarProvider } from 'notistack';

import { store } from '~/api';
import '~/init/axios';
import '~/styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <SnackbarProvider maxSnack={3} autoHideDuration={10000}>
      <Component {...pageProps} />
    </SnackbarProvider>
  </>
);

export default appWithTranslation(App);
