import { resetServerContext } from 'react-beautiful-dnd';

import { useTranslation } from 'next-i18next';

import { Board, Layout } from '~/components';
import { BoardWithColumns } from '~/types';
import { getProtectedPageServerSideProps } from '~/utils/getProtectedPageServerSideProps';

import { doRequest } from '../api';

const BoardPage = ({ board, isAuthenticated }: { board: BoardWithColumns; isAuthenticated: boolean }) => {
  const { t } = useTranslation('board');

  return (
    <Layout
      title={t('title', { title: board.title })}
      isAuthenticated={isAuthenticated}
      sx={{ p: 2, alignItems: 'flex-start', justifyContent: 'flex-start' }}
    >
      <Board board={board} />
    </Layout>
  );
};

export const getServerSideProps = getProtectedPageServerSideProps({
  i18nextNamespaces: ['header', 'board'],
  getAdditionalProps: async (context) => {
    resetServerContext();

    const { id } = context.params as { id: string };
    const response = await doRequest(`/api/boards/${id}`, { cookies: context.req.cookies });
    return { props: { board: response.data } };
  },
});

export default BoardPage;
