import axios from 'axios';

import { Board } from '~/types';

const createBoard = (board: Pick<Board, 'title'>) => axios.post<Board>('/boards', board).then(({ data }) => data);

const deleteBoard = (id: Board['id']) => axios.delete<void>(`/boards/${id}`);

const updateBoard = ({ id, title }: Board) => axios.put<void>(`/boards/${id}`, { title });

export { createBoard, deleteBoard, updateBoard };
