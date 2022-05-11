import { Provider } from 'react-redux';

import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';

import { SnackbarProvider } from 'notistack';

import '~/init/axios';
import { store } from '~/store';
import '~/styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <Component {...pageProps} />
      </SnackbarProvider>
    </Provider>
  </>
);

export default appWithTranslation(App);
