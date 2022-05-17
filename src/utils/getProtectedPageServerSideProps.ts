import { PATHS } from '~/config';

import { GetDefaultServerSideProps, getDefaultServerSideProps } from './getDefaultServerSideProps';

export const getProtectedPageServerSideProps: GetDefaultServerSideProps = ({ getAdditionalProps, i18nextNamespaces }) =>
  getDefaultServerSideProps({
    i18nextNamespaces,
    getAdditionalProps: async (context) => {
      if (!context.isAuthenticated) {
        return { redirect: { destination: PATHS.SIGN_IN, permanent: false } };
      }
      return getAdditionalProps ? getAdditionalProps(context) : { props: {} };
    },
  });
