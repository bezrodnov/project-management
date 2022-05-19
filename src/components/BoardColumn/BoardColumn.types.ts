import { Board, BoardColumn } from '~/types';

export type BoardColumnProps = {
  boardId: Board['id'];
  column: BoardColumn;
};
