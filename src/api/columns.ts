import axios from 'axios';

import { Board, BoardColumn } from '~/types';

const buildURL = (boardId: Board['id'], columnId?: BoardColumn['id']) =>
  `/boards/${boardId}/columns${columnId ? `/${columnId}` : ''}`;

const createColumn = (boardId: Board['id'], column: Pick<BoardColumn, 'title' | 'order'>) =>
  axios.post<BoardColumn>(buildURL(boardId), column).then(({ data }) => data);

const deleteColumn = (boardId: Board['id'], columnId: BoardColumn['id']) =>
  axios.delete<void>(buildURL(boardId, columnId));

const updateColumn = (
  boardId: Board['id'],
  columnId: BoardColumn['id'],
  column: Pick<BoardColumn, 'title' | 'order'>
) => axios.put<void>(buildURL(boardId, columnId), column);

export { createColumn, deleteColumn, updateColumn };
