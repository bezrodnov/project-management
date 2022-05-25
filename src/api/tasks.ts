import axios from 'axios';

import { Board, BoardColumn, Task } from '~/types';

const buildURL = (boardId: Board['id'], columnId: BoardColumn['id'], taskId?: Task['id']) =>
  `/boards/${boardId}/columns/${columnId}/tasks${taskId ? `/${taskId}` : ''}`;

const createTask = (
  boardId: Board['id'],
  columnId: BoardColumn['id'],
  task: Pick<Task, 'title' | 'description' | 'userId'>
) => axios.post<Omit<Task, 'order'>>(buildURL(boardId, columnId), task).then(({ data }) => data);

const deleteTask = (boardId: Board['id'], columnId: BoardColumn['id'], taskId: Task['id']) =>
  axios.delete<void>(buildURL(boardId, columnId, taskId));

const updateTask = (
  boardId: Board['id'],
  columnId: BoardColumn['id'],
  { id, ...task }: Task,
  destinationColumnId?: BoardColumn['id']
) =>
  axios.put<BoardColumn>(buildURL(boardId, columnId, id), {
    ...task,
    boardId,
    columnId: destinationColumnId ?? columnId,
  });

export { createTask, deleteTask, updateTask };
