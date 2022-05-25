export enum DroppableType {
  column = 'column',
  task = 'task',
}

export const orderComparator = <T extends { order: number }>(a: T, b: T) => a.order - b.order;
