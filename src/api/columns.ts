import axios from 'axios';

import { Board, BoardColumn } from '~/types';

const buildURL = (boardId: Board['id'], columnId?: BoardColumn['id']) =>
  `/boards/${boardId}/columns${columnId ? `/${columnId}` : ''}`;

const createColumn = (boardId: Board['id'], column: Omit<BoardColumn, 'id'>) =>
  axios.post<BoardColumn>(buildURL(boardId), column).then(({ data }) => data);

const deleteColumn = (boardId: Board['id'], columnId: BoardColumn['id']) =>
  axios.delete<void>(buildURL(boardId, columnId));

const updateColumn = (boardId: Board['id'], { id: columnId, title, order }: BoardColumn) =>
  axios.put<BoardColumn>(buildURL(boardId, columnId), { title, order });

export { createColumn, deleteColumn, updateColumn };
