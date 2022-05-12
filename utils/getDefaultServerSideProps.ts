import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ParsedUrlQuery } from 'querystring';

export const getDefaultServerSideProps =
  <
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery,
    D extends PreviewData = PreviewData
  >({
    getAdditionalProps,
    i18nextNamespaces,
  }: {
    getAdditionalProps?: GetServerSideProps<P, Q, D>;
    i18nextNamespaces?: string[];
  }): GetServerSideProps<P & { isAuthenticated: boolean }, Q, D> =>
  async (context) => {
    const token = context.req.cookies['auth-token'];

    const props = { isAuthenticated: !!token } as P & { isAuthenticated: boolean };
    if (getAdditionalProps) {
      const additionalProps = await getAdditionalProps(context);
      if ('props' in additionalProps) {
        Object.assign(props, additionalProps.props);
      } else {
        return additionalProps;
      }
    }

    if (i18nextNamespaces?.length) {
      Object.assign(props, await serverSideTranslations(context.locale ?? 'en', ['home', 'header']));
    }

    return { props };
  };
