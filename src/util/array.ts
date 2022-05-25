const reorder = <T extends { order: number }>(
  array: T[],
  {
    removeIndex,
    insertIndex,
    elementToInsert,
  }: {
    removeIndex?: number;
    insertIndex?: number;
    elementToInsert: T;
  }
) => {
  const result = array.map((value) => ({ ...value }));

  if (removeIndex !== undefined) {
    result.splice(removeIndex, 1);
  }

  if (insertIndex !== undefined) {
    result.splice(insertIndex, 0, elementToInsert);
  }

  result.forEach((value, index) => {
    value.order = index + 1;
  });

  return result;
};

export { reorder };
