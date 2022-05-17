import { MouseEvent } from 'react';

import { useTranslation } from 'next-i18next';
import Router, { useRouter } from 'next/router';

import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Tooltip } from '@mui/material';

import { deleteBoard } from '~/api/boards';
import { useConfirmationDialog } from '~/contexts';
import { useSnackbar } from '~/hooks';

const DeleteBoardIconButton = ({ id, title }: { id: string; title: string }) => {
  const { t } = useTranslation(['boards', 'common']);

  const router = useRouter();

  const { showConfirmationDialog } = useConfirmationDialog();
  const { enqueueSnackbar } = useSnackbar();

  const onClick = async (e: MouseEvent) => {
    e.stopPropagation();
    showConfirmationDialog({
      title: t('boards:deleteBoard'),
      message: t('boards:deleteBoardConfirmation', { title }),
      danger: true,
      onConfirm: () =>
        deleteBoard(id).then(
          () => {
            router.replace(router.asPath);
          },
          () => {
            enqueueSnackbar({ title: t('common:errors.common'), type: 'error' });
          }
        ),
    });
  };

  return (
    <Tooltip title={t('boards:deleteBoard')}>
      <IconButton onClick={onClick}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
};

export { DeleteBoardIconButton };
