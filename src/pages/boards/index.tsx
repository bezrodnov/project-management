import { MouseEvent } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List, ListItem, ListItemText, Tooltip } from '@mui/material';

import { Layout } from '~/components';
import { CreateBoardButton } from '~/components/CreateBoardButton';
import { PATHS } from '~/config';
import { doRequest } from '~/pages/api';
import { Board } from '~/types';
import { getProtectedPageServerSideProps } from '~/utils/getProtectedPageServerSideProps';

const DeleteBoardIcon = ({ id, title }: { id: string; title: string }) => {
  const { t } = useTranslation('boards');

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Tooltip title={t('deleteBoard')}>
      <IconButton onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

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
              <DeleteBoardIcon id={id} title={title} />
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
