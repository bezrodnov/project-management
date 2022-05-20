import { Dispatch, DispatchWithoutAction, ReactNode } from 'react';

type ConfirmationMessage = {
  title: string;
  message: ReactNode;
  danger?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | PromiseLike<void>;
  onCancel?: DispatchWithoutAction;
};

type ConfirmationDialogContextShape = {
  showConfirmationDialog: Dispatch<ConfirmationMessage>;
};

export type { ConfirmationMessage, ConfirmationDialogContextShape };
