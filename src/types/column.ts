import { TaskWithFiles } from './task';
import { Branded } from './util';

type BoardColumn = {
  id: Branded<string, 'columnId'>;
  title: string;
  order: number;
};

type BoardColumnWithTasks = BoardColumn & {
  tasks: TaskWithFiles[];
};

export type { BoardColumn, BoardColumnWithTasks };
