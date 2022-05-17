import { useCallback } from 'react';

import { OptionsObject, useSnackbar as useSnackbarOriginal } from 'notistack';

import { SnackbarMessage, SnackbarMessageProps } from '~/components';

const useSnackbar = () => {
  const { enqueueSnackbar: enqueueSnackbarOriginal, closeSnackbar } = useSnackbarOriginal();

  const enqueueSnackbar = useCallback(
    ({
      title,
      description,
      type,
      ...options
    }: Omit<SnackbarMessageProps, 'snackbarKey'> & Omit<OptionsObject, 'key'>) => {
      enqueueSnackbarOriginal(title, {
        ...options,
        content: (key) => (
          <div>
            <SnackbarMessage
              closeSnackbar={() => closeSnackbar(key)}
              title={title}
              description={description}
              type={type}
            />
          </div>
        ),
      });
    },
    [closeSnackbar, enqueueSnackbarOriginal]
  );

  return { enqueueSnackbar, closeSnackbar };
};

export { useSnackbar };
