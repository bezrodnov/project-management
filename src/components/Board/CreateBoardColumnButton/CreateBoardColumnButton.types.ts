import { Dispatch } from 'react';

import { Board, BoardColumn } from '~/types';

export type CreateBoardColumnButtonProps = {
  boardId: Board['id'];
  onColumnCreated?: Dispatch<BoardColumn>;
};
