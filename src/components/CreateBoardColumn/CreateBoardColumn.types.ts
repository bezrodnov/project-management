import { Board, BoardColumn } from '~/types';

export type CreateBoardColumnProps = {
  onColumnCreated: (title: string) => Promise<unknown>;
};
