import { Branded } from './util';

type Task = {
  id: Branded<string, 'taskId'>;
  title: string;
  order: number;
  done: boolean;
  description: string;
  userId: Branded<string, 'userId'>;
};

type TaskWithFiles = Task & {
  files: { fileName: string; fileSize: number }[];
};

export type { Task, TaskWithFiles };
