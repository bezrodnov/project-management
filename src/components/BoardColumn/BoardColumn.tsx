import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useTranslation } from 'next-i18next';

import { Paper, Typography } from '@mui/material';

import { updateColumn } from '~/api/columns';
import { useSnackbar } from '~/hooks';
import { boardColumnWidth } from '~/styles/BoardColumn';

import { EditableText } from '../EditableText';
import { BoardColumnProps } from './BoardColumn.types';

const BoardColumn = ({ boardId, column }: BoardColumnProps) => {
  const { t } = useTranslation('board');

  const [title, setTitle] = useState(column.title);

  const { enqueueSnackbar } = useSnackbar();

  const onColumnTitleChange = async (title: string) => {
    if (!title) {
      throw new Error();
    }
    return updateColumn(boardId, { ...column, title })
      .then(() => {
        setTitle(title);
      })
      .catch((e) => {
        enqueueSnackbar({
          type: 'error',
          title: t('errors.updateColumnTitle.title'),
          description: t('errors.updateColumnTitle.description'),
        });

        throw e;
      });
  };

  return (
    <Draggable draggableId={column.id} index={column.order - 1}>
      {(draggable) => (
        <Paper
          ref={draggable.innerRef}
          {...draggable.draggableProps}
          {...draggable.dragHandleProps}
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 1,
            opacity: 1,
            ...boardColumnWidth,
          }}
        >
          <EditableText variant="body1" onChange={onColumnTitleChange}>
            {title}
          </EditableText>
        </Paper>
      )}
    </Draggable>
  );
};

export { BoardColumn };
