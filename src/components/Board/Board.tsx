import { useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import { Stack } from '@mui/material';

import { updateColumn } from '~/api/columns';
import { BoardColumn as TBoardColumn } from '~/types';
import { reorder } from '~/util/array';

import { BoardProps } from './Board.types';
import { BoardColumn } from './BoardColumn';
import { BoardTitle } from './BoardTitle';
import { CreateBoardColumnButton } from './CreateBoardColumnButton';

const Board = ({ board }: BoardProps) => {
  const [columns, setColumns] = useState(() => [...board.columns.sort((a, b) => a.order - b.order)]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const reorderedColumns = reorder(columns, result.source.index, result.destination.index);
    reorderedColumns.forEach((column, index) => {
      column.order = index + 1;
    });

    setColumns(reorderedColumns);

    // HACK: Backend does not support column order update in batch and throws 500
    // if two columns have the same order after a column update
    // so we are forced to do this hack: first of all, shift all orders by
    // a column count + some safety buffer (in case new column is being added in parallel)
    Promise.all(
      reorderedColumns.map((column) =>
        updateColumn(board.id, { ...column, order: column.order + reorderedColumns.length + 1 })
      )
    ).then(() =>
      // and then set actual order values based on new column order
      Promise.all(reorderedColumns.map((column) => updateColumn(board.id, column)))
    );
  };

  const onColumnCreated = (newColumn: TBoardColumn) => {
    setColumns([...columns, { ...newColumn, tasks: [] }]);
  };

  return (
    <Stack spacing={2} alignItems="flex-start">
      <BoardTitle id={board.id} title={board.title} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="boards" direction="horizontal">
          {(droppable) => (
            <Stack
              ref={droppable.innerRef}
              {...droppable.droppableProps}
              direction="row"
              spacing={1}
              sx={{ overflowX: 'auto', flexGrow: 1, alignItems: 'flex-start' }}
            >
              {columns.map((column) => (
                <BoardColumn key={column.id} column={column} boardId={board.id} />
              ))}
              {droppable.placeholder}
              <CreateBoardColumnButton
                boardId={board.id}
                order={columns.length + 1}
                onColumnCreated={onColumnCreated}
              />
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Stack>
  );
};

export { Board };
