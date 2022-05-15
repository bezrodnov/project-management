import { PATHS } from '~/config';

import { GetDefaultServerSideProps, getDefaultServerSideProps } from './getDefaultServerSideProps';

export const getUnauthorizedPageServerSideProps: GetDefaultServerSideProps = ({
  getAdditionalProps,
  i18nextNamespaces,
}) =>
  getDefaultServerSideProps({
    i18nextNamespaces,
    getAdditionalProps: async (context) => {
      if (context.isAuthenticated) {
        return { redirect: { destination: PATHS.HOME, permanent: false } };
      }
      return getAdditionalProps ? getAdditionalProps(context) : { props: {} };
    },
  });
