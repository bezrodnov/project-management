import axios from 'axios';

import { Board } from '~/types';

const getBoards = () => axios.get<Board[]>('/boards').then(({ data }) => data);

const createBoard = (board: Omit<Board, 'id'>) => axios.post<Board>('/boards', board).then(({ data }) => data);

const deleteBoard = (id: Board['id']) => axios.delete<void>(`/boards/${id}`);

export { getBoards, createBoard, deleteBoard };
