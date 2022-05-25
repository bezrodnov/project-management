import { Board, BoardColumn, TaskWithFiles } from '~/types';

export type TaskProps = {
  boardId: Board['id'];
  columnId: BoardColumn['id'];
  task: TaskWithFiles;
};
