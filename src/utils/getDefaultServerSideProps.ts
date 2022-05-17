import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ParsedUrlQuery } from 'querystring';

type WithAuth<T = {}> = T & { isAuthenticated: boolean };

type GetDefaultServerSideProps<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = (p: {
  getAdditionalProps?: (context: WithAuth<GetServerSidePropsContext<Q, D>>) => Promise<GetServerSidePropsResult<P>>;
  i18nextNamespaces?: string[];
}) => GetServerSideProps<WithAuth<P>, Q, D>;

const getDefaultServerSideProps: GetDefaultServerSideProps =
  ({ getAdditionalProps, i18nextNamespaces }) =>
  async (context) => {
    const token = context.req.cookies['auth-token'];
    const isAuthenticated = !!token;

    const props = { isAuthenticated };
    if (getAdditionalProps) {
      const additionalProps = await getAdditionalProps({ ...context, isAuthenticated });
      if ('props' in additionalProps) {
        Object.assign(props, additionalProps.props);
      } else {
        return additionalProps;
      }
    }

    if (i18nextNamespaces?.length) {
      Object.assign(props, await serverSideTranslations(context.locale ?? 'en', i18nextNamespaces));
    }

    return { props };
  };

export type { GetDefaultServerSideProps };
export { getDefaultServerSideProps };
