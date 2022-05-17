type Board = {
  id: string;
  title: string;
};

type BoardWithColumns = Board & {
  columns: {}[];
};

export type { Board, BoardWithColumns };
