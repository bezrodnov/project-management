import { useCallback } from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import * as Yup from 'yup';

import { createBoard } from '~/api/boards';
import {
  Form,
  Formik,
  FormikHelpers,
  TextField,
  ValidationSchemaBulder,
  useValidationSchema,
} from '~/components/formik';
import { PATHS } from '~/config';
import { useBoolean } from '~/hooks';

type FormValues = {
  title: string;
};

const initialValues: FormValues = { title: '' };

const valdiationSchemaBulder: ValidationSchemaBulder<FormValues> = (t) =>
  Yup.object().shape({
    title: Yup.string().required(t('common:forms.fieldIsRequired')),
  });

const CreateBoardButton = () => {
  const { t } = useTranslation(['boards', 'common']);

  const router = useRouter();

  const [isProcessing, { on: startProcessing }] = useBoolean();
  const onSubmit = useCallback(
    async ({ title }: FormValues) => {
      startProcessing();
      const { id } = await createBoard({ title });
      router.push(PATHS.BOARD(id));
    },
    [startProcessing, router]
  );

  const [isDialogOpen, { on: openDialog, off: closeDialog }] = useBoolean();

  const validationSchema = useValidationSchema(valdiationSchemaBulder);
  return (
    <>
      <Button variant="contained" endIcon={<AddCircleIcon />} onClick={openDialog}>
        {t('boards:createBoard')}
      </Button>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ resetForm }) => {
          const onClose = () => {
            closeDialog();
            resetForm();
          };

          return (
            <Dialog open={isDialogOpen} onClose={onClose} maxWidth="md">
              <DialogTitle>{t('boards:createBoard')}</DialogTitle>
              <Form>
                <DialogContent sx={{ pt: 2 }}>
                  <TextField<FormValues, 'title'>
                    name="title"
                    label={t('boards:board.title')}
                    disabled={isProcessing}
                  />
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined" onClick={onClose} disabled={isProcessing}>
                    {t('common:cancel')}
                  </Button>
                  <Button variant="contained" type="submit" disabled={isProcessing}>
                    {t('common:ok')}
                  </Button>
                </DialogActions>
              </Form>
            </Dialog>
          );
        }}
      </Formik>
    </>
  );
};

export { CreateBoardButton };
