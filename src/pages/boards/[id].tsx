import { useTranslation } from 'next-i18next';

import { Layout } from '~/components';
import { BoardWithColumns } from '~/types';
import { getProtectedPageServerSideProps } from '~/utils/getProtectedPageServerSideProps';

import { doRequest } from '../api';

const Board = ({ board, isAuthenticated }: { board: BoardWithColumns; isAuthenticated: boolean }) => {
  const { t } = useTranslation('board');
  return (
    <Layout title={t('title', { title: board.title })} isAuthenticated={isAuthenticated}>
      {board.title}
    </Layout>
  );
};

export const getServerSideProps = getProtectedPageServerSideProps({
  i18nextNamespaces: ['header', 'board', 'common'],
  getAdditionalProps: async (context) => {
    const { id } = context.params as { id: string };
    const response = await doRequest(`/api/boards/${id}`, { cookies: context.req.cookies });
    return { props: { board: response.data } };
  },
});

export default Board;
