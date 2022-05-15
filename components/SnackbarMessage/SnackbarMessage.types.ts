import { DispatchWithoutAction } from 'react';

export type SnackbarMessageProps = {
  title: string;
  description?: string;
  type: 'success' | 'warning' | 'error';
  closeSnackbar?: DispatchWithoutAction;
};
