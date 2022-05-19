import { Draggable } from 'react-beautiful-dnd';

import { Stack, Typography } from '@mui/material';

import { BoardColumnProps } from './BoardColumn.types';

const BoardColumn = ({ boardId, column }: BoardColumnProps) => {
  return (
    <Draggable draggableId={column.id} index={column.order - 1}>
      {(draggable) => (
        <Stack
          ref={draggable.innerRef}
          {...draggable.draggableProps}
          {...draggable.dragHandleProps}
          sx={(theme) => ({
            minWidth: {
              xs: '80%',
              sm: '50%',
              md: 320,
            },
            bgcolor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            p: 2,
            opacity: 1,
          })}
        >
          <Typography>{column.title}</Typography>
        </Stack>
      )}
    </Draggable>
  );
};

export { BoardColumn };
