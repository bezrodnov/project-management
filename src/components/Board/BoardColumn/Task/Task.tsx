import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Paper } from '@mui/material';

import { EditableText } from '~/components/EditableText';

import { TaskProps } from './Task.types';

const Task = ({ task }: TaskProps) => {
  const [title, setTitle] = useState(task.title);

  const onTitleChange = async (title: string) => {
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
    <Draggable draggableId={task.id} index={task.order - 1}>
      {(draggable) => (
        <Paper
          ref={draggable.innerRef}
          {...draggable.draggableProps}
          elevation={0}
          sx={({ palette }) => ({ bgcolor: palette.grey[300], p: 1, mt: 1 })}
        >
          <EditableText {...draggable.dragHandleProps} variant="body1" onChange={onTitleChange}>
            {task.title}
          </EditableText>
        </Paper>
      )}
    </Draggable>
  );
};

export { Task };
