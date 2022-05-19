type Branded<T, K extends string> = T & { _brand: K };

export type { Branded };
