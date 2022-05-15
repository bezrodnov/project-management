import axios, { AxiosError } from 'axios';

axios.defaults.baseURL = '/api';

const defaultStatusCode = 500;

axios.interceptors.response.use(undefined, (error: unknown) => {
  const statusCode = error instanceof AxiosError ? error.response?.status ?? defaultStatusCode : defaultStatusCode;
  return Promise.reject(statusCode);
});
