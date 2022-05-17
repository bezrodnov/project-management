import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { List, ListItem, ListItemText } from '@mui/material';

import { Layout } from '~/components';
import { CreateBoardButton } from '~/components';
import { DeleteBoardIconButton } from '~/components';
import { PATHS } from '~/config';
import { doRequest } from '~/pages/api';
import { Board } from '~/types';
import { getProtectedPageServerSideProps } from '~/utils/getProtectedPageServerSideProps';

const Boards = ({ isAuthenticated, boards }: { isAuthenticated: boolean; boards: Board[] }) => {
  const { t } = useTranslation(['boards', 'common']);

  return (
    <Layout isAuthenticated={isAuthenticated} title={t('title')}>
      <CreateBoardButton />
      <List
        sx={{
          width: {
            xs: '100%',
            xm: '75%',
            md: '50%',
            lg: '33%',
          },
        }}
      >
        {boards.map(({ id, title }) => (
          <Link key={id} href={PATHS.BOARD(id)}>
            <ListItem
              sx={({ palette, spacing, transitions }) => ({
                bgcolor: palette.background.paper,
                m: spacing(1, 0),
                cursor: 'pointer',
                transition: transitions.create('all'),
                ':hover': {
                  bgcolor: palette.primary.light,
                },
              })}
            >
              <ListItemText sx={{ flexGrow: 1, pr: 2 }}>{title}</ListItemText>
              <DeleteBoardIconButton id={id} title={title} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Layout>
  );
};

export const getServerSideProps = getProtectedPageServerSideProps({
  i18nextNamespaces: ['header', 'boards', 'common'],
  getAdditionalProps: async (context) => {
    const response = await doRequest('/api/boards', { cookies: context.req.cookies });
    return { props: { boards: response.data } };
  },
});

export default Boards;
