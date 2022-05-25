import { useEffect, useState } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Stack } from '@mui/material';

import { updateColumn } from '~/api/columns';
import { updateTask } from '~/api/tasks';
import { useSnackbar } from '~/hooks';
import { BoardColumnWithTasks, BoardColumn as TBoardColumn } from '~/types';
import { reorder } from '~/util/array';

import { DroppableType, orderComparator } from './Board.constants';
import { BoardProps } from './Board.types';
import { BoardColumn } from './BoardColumn';
import { BoardTitle } from './BoardTitle';
import { CreateBoardColumnButton } from './CreateBoardColumnButton';

const Board = ({ board }: BoardProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [columns, setColumns] = useState<BoardColumnWithTasks[]>([]);

  useEffect(() => {
    setColumns(
      [...board.columns]
        .sort(orderComparator)
        // TODO: there seem to be an issue on BE which allows column order with missing values, e.g. 1, 2, 3, 5
        // so for now just make sure all order values are "in order"
        .map((column, index) => ({ ...column, order: index + 1, tasks: column.tasks.sort(orderComparator) }))
    );
  }, [board.columns]);

  const { enqueueSnackbar } = useSnackbar();

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }

    if (type === DroppableType.column) {
      const movedColumn = columns[source.index];
      updateColumn(board.id, { ...movedColumn, order: destination.index + 1 }).catch(() => {
        enqueueSnackbar({
          type: 'error',
          title: t('board:errors.moveColumn.title'),
          description: t('board:errors.moveColumn.description'),
        });

        router.replace(router.asPath);
      });

      setColumns((columns) =>
        reorder(columns, {
          removeIndex: source.index,
          insertIndex: destination.index,
          elementToInsert: movedColumn,
        })
      );

      return;
    }

    if (type === DroppableType.task) {
      const sourceColumnId = source.droppableId as TBoardColumn['id'];
      const destinationColumnId = destination.droppableId as TBoardColumn['id'];
      const { files, ...task } = columns.find(({ id }) => id === sourceColumnId)!.tasks[source.index];
      updateTask(board.id, sourceColumnId, { ...task, order: destination.index + 1 }, destinationColumnId).catch(() => {
        enqueueSnackbar({
          type: 'error',
          title: t('issue:errors.moveTask.title'),
          description: t('issue:errors.moveTask.description'),
        });

        router.replace(router.asPath);
      });

      setColumns((columns) =>
        columns.map((column) => {
          const isSourceColumn = column.id === sourceColumnId;
          const isDestinationColumn = column.id === destinationColumnId;

          if (isSourceColumn || isDestinationColumn) {
            return {
              ...column,
              tasks: reorder(column.tasks, {
                removeIndex: isSourceColumn ? source.index : undefined,
                insertIndex: isDestinationColumn ? destination.index : undefined,
                elementToInsert: { ...task, files },
              }),
            };
          }

          return column;
        })
      );
    }
  };

  const onColumnCreated = (newColumn: TBoardColumn) => {
    setColumns([...columns, { ...newColumn, tasks: [] }]);
  };

  console.table(columns);

  return (
    <Stack spacing={2} alignItems="flex-start">
      <BoardTitle board={board} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="columns" direction="horizontal" type={DroppableType.column}>
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
