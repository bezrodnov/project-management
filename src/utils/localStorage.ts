const getLocalStorageValue = <T>(key: string, defaultValue: T) => {
  const value = window.localStorage.getItem(key);
  return value === null ? defaultValue : (JSON.parse(value) as T);
};

const setLocalStorageValue = <T>(key: string, value: T) => {
  if (value != undefined) {
    window.localStorage.setItem(key, JSON.stringify(value));
  } else {
    window.localStorage.removeItem(key);
  }
};

export { getLocalStorageValue, setLocalStorageValue };
