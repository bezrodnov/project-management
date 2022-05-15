import { AxiosError } from 'axios';

type RejectWithValue = (value: unknown) => unknown;

export const withAxiosStatusCode =
  (rejectWithValue: RejectWithValue, defaultStatusCode = 500) =>
  (value: unknown) => {
    const statusCode = value instanceof AxiosError ? value.response?.status ?? defaultStatusCode : defaultStatusCode;

    return rejectWithValue(statusCode);
  };
