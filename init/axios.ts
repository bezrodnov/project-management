import axios, { AxiosError } from 'axios';

import { UserNotAuthenticatedError } from '~/errors';

axios.defaults.baseURL = '/api';

axios.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error?.isAxiosError && error.response?.status === 401) {
    throw new UserNotAuthenticatedError();
  }
  throw error;
});
