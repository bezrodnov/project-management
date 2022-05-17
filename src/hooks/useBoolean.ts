import { useCallback, useState } from 'react';

const useBoolean = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);

  const on = useCallback(() => {
    setValue(true);
  }, []);

  const off = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, { on, off, toggle }] as const;
};

export { useBoolean };
