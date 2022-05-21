import { Board, BoardColumnWithTasks } from '~/types';

export type BoardColumnProps = {
  boardId: Board['id'];
  column: BoardColumnWithTasks;
};
