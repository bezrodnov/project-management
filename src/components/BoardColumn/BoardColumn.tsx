import { Draggable } from 'react-beautiful-dnd';

import { Paper, Typography } from '@mui/material';

import { boardColumnWidth } from '~/styles/BoardColumn';

import { BoardColumnProps } from './BoardColumn.types';

const BoardColumn = ({ boardId, column }: BoardColumnProps) => {
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
          <Typography>{column.title}</Typography>
        </Paper>
      )}
    </Draggable>
  );
};

export { BoardColumn };
