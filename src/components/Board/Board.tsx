import { useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Stack } from '@mui/material';

import { updateColumn } from '~/api/columns';
import { useSnackbar } from '~/hooks';
import { BoardColumnWithTasks, BoardColumn as TBoardColumn } from '~/types';
import { reorder } from '~/util/array';

import { BoardProps } from './Board.types';
import { BoardColumn } from './BoardColumn';
import { BoardTitle } from './BoardTitle';
import { CreateBoardColumnButton } from './CreateBoardColumnButton';

const Board = ({ board }: BoardProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [columns, setColumns] = useState<BoardColumnWithTasks[]>([]);

  useEffect(() => {
    setColumns([...board.columns].sort((a, b) => a.order - b.order));
  }, [board.columns]);

  const { enqueueSnackbar } = useSnackbar();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const movedColumn = columns[result.source.index];
    updateColumn(board.id, { ...movedColumn, order: result.destination.index + 1 }).catch(() => {
      enqueueSnackbar({
        type: 'error',
        title: t('board:errors.moveColumn.title'),
        description: t('board:errors.moveColumn.description'),
      });

      router.replace(router.asPath);
    });

    const reorderedColumns = reorder(columns, result.source.index, result.destination.index);
    reorderedColumns.forEach((column, index) => {
      column.order = index + 1;
    });

    setColumns(reorderedColumns);
  };

  const onColumnCreated = (newColumn: TBoardColumn) => {
    setColumns([...columns, { ...newColumn, tasks: [] }]);
  };

  return (
    <Stack spacing={2} alignItems="flex-start">
      <BoardTitle board={board} />
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
              <CreateBoardColumnButton boardId={board.id} onColumnCreated={onColumnCreated} />
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Stack>
  );
};

export { Board };
