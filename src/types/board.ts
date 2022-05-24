import { BoardColumnWithTasks } from './column';
import { Branded } from './util';

type Board = {
  id: Branded<string, 'boardId'>;
  title: string;
  description: string;
};

type BoardWithColumns = Board & {
  columns: BoardColumnWithTasks[];
};

export type { Board, BoardWithColumns };
