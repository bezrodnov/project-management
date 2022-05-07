const getLocalStorageValue = <T>(key: string, defaultValue: T) => {
  const value = localStorage.getItem(key);
  return value === null ? defaultValue : JSON.parse(value) as T;
};

const setLocalStorageValue = <T>(key: string, value: T) => {
  if (value != undefined) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.removeItem(key);
  }
};

export { getLocalStorageValue, setLocalStorageValue };