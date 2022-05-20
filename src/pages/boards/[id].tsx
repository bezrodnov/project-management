import { useState } from 'react';
import { DragDropContext, DropResult, Droppable, resetServerContext } from 'react-beautiful-dnd';

import { useTranslation } from 'next-i18next';

import { Stack } from '@mui/material';

import { createColumn, updateColumn } from '~/api/columns';
import { BoardColumn, BoardTitle, CreateBoardColumn, Layout } from '~/components';
import { BoardWithColumns } from '~/types';
import { reorder } from '~/util/array';
import { getProtectedPageServerSideProps } from '~/utils/getProtectedPageServerSideProps';

import { doRequest } from '../api';

const Board = ({ board, isAuthenticated }: { board: BoardWithColumns; isAuthenticated: boolean }) => {
  const { t } = useTranslation('board');

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
    // so we are forced to do this hack: first of all, shift all orders by a column count
    Promise.all(
      reorderedColumns.map((column) =>
        updateColumn(board.id, column.id, { order: column.order + reorderedColumns.length + 1, title: column.title })
      )
    ).then(() =>
      // and then set actual order values based on new column order
      Promise.all(
        reorderedColumns.map((column) =>
          updateColumn(board.id, column.id, { order: column.order, title: column.title })
        )
      )
    );
  };

  const onColumnCreated = async (title: string) =>
    createColumn(board.id, { title, order: columns.length ? columns[columns.length - 1].order + 1 : 1 }).then(
      (newColumn) => {
        setColumns([...columns, newColumn]);
      },
      (e) => {
        // TODO: show something in snackbar
        throw e;
      }
    );

  return (
    <Layout
      title={t('title', { title: board.title })}
      isAuthenticated={isAuthenticated}
      sx={{ alignItems: 'flex-start', p: 2, '& > *:not(:last-child)': { mb: 2 } }}
    >
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
              <CreateBoardColumn onColumnCreated={onColumnCreated} />
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
    </Layout>
  );
};

export const getServerSideProps = getProtectedPageServerSideProps({
  i18nextNamespaces: ['header', 'board'],
  getAdditionalProps: async (context) => {
    resetServerContext();

    const { id } = context.params as { id: string };
    const response = await doRequest(`/api/boards/${id}`, { cookies: context.req.cookies });
    return { props: { board: response.data } };
  },
});

export default Board;
