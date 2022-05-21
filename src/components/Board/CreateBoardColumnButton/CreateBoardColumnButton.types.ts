import { Dispatch } from 'react';

import { Board, BoardColumn } from '~/types';

export type CreateBoardColumnButtonProps = {
  boardId: Board['id'];
  order: BoardColumn['order'];
  onColumnCreated?: Dispatch<BoardColumn>;
};
