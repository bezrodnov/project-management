import { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import { useTranslation } from 'next-i18next';

import { Box, Paper, Stack, Typography } from '@mui/material';

import { updateColumn } from '~/api/columns';
import { useSnackbar } from '~/hooks';
import { boardColumnWidth } from '~/styles/BoardColumn';
import { Task } from '~/types';

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

  const onTaskTitleChange = async (taskId: Task['id'], title: string) => {
    if (!title) {
      throw new Error();
    }
    // return updateTask(boardId, column.id, { ...column.tasks.find(({ id }) => id === taskId), title })
    //   .then(() => {
    //     setTaskTitle(title);
    //   })
    //   .catch((e) => {
    //     enqueueSnackbar({
    //       type: 'error',
    //       title: t('errors.updateTaskTitle.title'),
    //       description: t('errors.updateTaskTitle.description'),
    //     });

    //     throw e;
    //   });
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
          <EditableText variant="body1" onChange={onColumnTitleChange} sx={{ ml: 1, mr: 1 }}>
            {title}
          </EditableText>
          <Droppable droppableId="tasks">
            {(droppable) => (
              <Stack ref={droppable.innerRef} {...droppable.droppableProps} spacing={1} sx={{ alignItems: 'stretch' }}>
                {column.tasks.map((task) => (
                  <Paper
                    key={task.id}
                    elevation={0}
                    sx={({ palette }) => ({ bgcolor: palette.grey[300], p: 1, mt: 1 })}
                  >
                    <EditableText variant="body1" onChange={(title) => onTaskTitleChange(task.id, title)}>
                      {task.title}
                    </EditableText>
                  </Paper>
                ))}
              </Stack>
            )}
          </Droppable>
        </Paper>
      )}
    </Draggable>
  );
};

export { BoardColumn };
