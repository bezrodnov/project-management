import { GetServerSideProps, GetServerSidePropsContext, PreviewData } from 'next';

import { ParsedUrlQuery } from 'querystring';

import { PATHS } from '~/config';

import { getDefaultServerSideProps } from './getDefaultServerSideProps';

export const getProtectedPageServerSideProps = <
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>({
  getAdditionalProps,
  i18nextNamespaces,
}: { getAdditionalProps?: GetServerSideProps<P, Q, D>; i18nextNamespaces?: string[] } = {}) =>
  getDefaultServerSideProps({
    i18nextNamespaces,
    getAdditionalProps: async (context: GetServerSidePropsContext<Q, D>) => {
      const token = context.req.cookies['auth-token'];
      if (!token) {
        return { redirect: { destination: PATHS.SIGN_IN, permanent: false } };
      }
      return getAdditionalProps ? getAdditionalProps(context) : { props: {} as P };
    },
  });
