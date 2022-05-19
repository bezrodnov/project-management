import axios from 'axios';

import { Board, BoardColumn } from '~/types';

const createBoard = (board: Pick<Board, 'title'>) => axios.post<Board>('/boards', board).then(({ data }) => data);

const deleteBoard = (id: Board['id']) => axios.delete<void>(`/boards/${id}`);

const updateBoard = ({ id, title }: Board) => axios.put<void>(`/boards/${id}`, { title });

const updateColumn = (
  boardId: Board['id'],
  columnId: BoardColumn['id'],
  column: Pick<BoardColumn, 'title' | 'order'>
) => axios.put<void>(`/boards/${boardId}/columns/${columnId}`, column);

export { createBoard, deleteBoard, updateBoard, updateColumn };
