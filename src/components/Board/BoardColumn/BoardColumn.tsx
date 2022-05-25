import { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { useTranslation } from 'next-i18next';

import { Paper, Stack } from '@mui/material';

import { updateColumn } from '~/api/columns';
import { EditableText } from '~/components';
import { useSnackbar } from '~/hooks';
import { boardColumnWidth } from '~/styles/BoardColumn';

import { DroppableType } from '../Board.constants';
import { BoardColumnProps } from './BoardColumn.types';
import { Task } from './Task';

const BoardColumn = ({ boardId, column }: BoardColumnProps) => {
  const { t } = useTranslation('board');

  const [title, setTitle] = useState(column.title);

  const { enqueueSnackbar } = useSnackbar();

  const onTitleChange = async (title: string) => {
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
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 1,
            opacity: 1,
            ...boardColumnWidth,
          }}
        >
          <EditableText {...draggable.dragHandleProps} variant="body1" onChange={onTitleChange} sx={{ ml: 1, mr: 1 }}>
            {title}
          </EditableText>
          <Droppable droppableId={column.id} type={DroppableType.task}>
            {(droppable) => (
              <Stack
                ref={droppable.innerRef}
                {...droppable.droppableProps}
                spacing={1}
                sx={{ alignItems: 'stretch', minHeight: 10 }}
              >
                {column.tasks.map((task) => (
                  <Task key={task.id} task={task} boardId={boardId} columnId={column.id} />
                ))}
                {droppable.placeholder}
              </Stack>
            )}
          </Droppable>
        </Paper>
      )}
    </Draggable>
  );
};

export { BoardColumn };
