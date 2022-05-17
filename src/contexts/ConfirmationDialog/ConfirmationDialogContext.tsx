import { ReactNode, createContext, useCallback, useContext, useRef } from 'react';

import { useTranslation } from 'next-i18next';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import { useBoolean } from '~/hooks';

import { ConfirmationDialogContextShape, ConfirmationMessage } from './ConfirmationDialogContext.types';

const ConfirmationDialogContext = createContext({} as ConfirmationDialogContextShape);

const ConfirmationDialogContextProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation('common');

  const [isOpen, { on: openDialog, off: closeDialog }] = useBoolean();

  const messageRef = useRef<ConfirmationMessage | null>(null);

  const showConfirmationDialog = useCallback(
    (message: ConfirmationMessage) => {
      if (isOpen) {
        console.warn('Only one confirmation dialog can be open at the same time');
        return;
      }

      messageRef.current = message;
      openDialog();
    },
    [isOpen, openDialog]
  );

  const onClose = () => {
    messageRef.current?.onCancel?.();
    closeDialog();
  };

  const onCancel = () => {
    messageRef.current?.onCancel?.();
    closeDialog();
  };

  const onConfirm = async () => {
    await messageRef.current?.onConfirm();
    closeDialog();
  };

  return (
    <ConfirmationDialogContext.Provider value={{ showConfirmationDialog }}>
      {children}
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{messageRef.current?.title}</DialogTitle>
        <DialogContent>
          {typeof messageRef.current?.message === 'string' ? (
            <Typography>{messageRef.current.message}</Typography>
          ) : (
            messageRef.current?.message
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onCancel}>
            {messageRef.current?.cancelText ?? t('no')}
          </Button>
          <Button variant="contained" color={messageRef.current?.danger ? 'error' : undefined} onClick={onConfirm}>
            {messageRef.current?.confirmText ?? t('yes')}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmationDialogContext.Provider>
  );
};

const useConfirmationDialog = () => useContext(ConfirmationDialogContext);

export { ConfirmationDialogContextProvider, useConfirmationDialog };
