import { Branded } from './util';

type Board = {
  id: Branded<string, 'boardId'>;
  title: string;
};

type Task = {
  id: Branded<string, 'taskId'>;
  title: string;
  order: number;
  description: string;
  userId: string;
};

type BoardColumn = {
  id: Branded<string, 'columnId'>;
  title: string;
  order: number;
  tasks: Task[];
};

type BoardWithColumns = Board & {
  columns: BoardColumn[];
};

export type { Board, BoardWithColumns, BoardColumn, Task };
