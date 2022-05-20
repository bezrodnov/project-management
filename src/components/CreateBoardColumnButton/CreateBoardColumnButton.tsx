import { useTranslation } from 'next-i18next';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, ClickAwayListener, Collapse, IconButton } from '@mui/material';

import * as Yup from 'yup';

import { createColumn } from '~/api/columns';
import { Form, Formik, TextField, ValidationSchemaBuilder, useValidationSchema } from '~/components/formik';
import { useBoolean, useSnackbar } from '~/hooks';
import { boardColumnWidth } from '~/styles/BoardColumn';

import { CreateBoardColumnButtonProps } from './CreateBoardColumnButton.types';

type FormValues = {
  title: string;
};

const initialValues: FormValues = { title: '' };

const valdiationSchemaBuilder: ValidationSchemaBuilder<FormValues> = (t) =>
  Yup.object().shape({
    title: Yup.string().required(t('common:forms.fieldIsRequired')),
  });

const CreateBoardColumnButton = ({ boardId, order, onColumnCreated }: CreateBoardColumnButtonProps) => {
  const { t } = useTranslation('board');

  const { enqueueSnackbar } = useSnackbar();

  const [isInEditMode, { on: beginEdit, off: endEdit }] = useBoolean();
  const [isSaving, { on: beginSave, off: endSave }] = useBoolean();

  const handleCreateColumn = ({ title }: FormValues) => {
    beginSave();

    createColumn(boardId, { title, order })
      .then(
        (column) => onColumnCreated?.({ ...column, tasks: [] }),
        (e) => {
          enqueueSnackbar({
            type: 'error',
            title: t('errors.createColumn.title'),
            description: t('errors.createColumn.description'),
          });
          throw e;
        }
      )
      .then(endEdit)
      .finally(endSave);
  };

  const onClickAway = () => {
    if (!isSaving) {
      endEdit();
    }
  };

  const validationSchema = useValidationSchema(valdiationSchemaBuilder);

  return (
    <Box sx={boardColumnWidth}>
      {!isInEditMode && (
        <Button
          variant="outlined"
          onClick={beginEdit}
          startIcon={<AddIcon />}
          fullWidth
          sx={(theme) => ({
            background: theme.palette.grey[400],
            textTransform: 'none',
            color: theme.palette.text.primary,
            border: 'none',
            opacity: 0.75,
            justifyContent: 'flex-start',
            '&:hover': {
              background: theme.palette.grey[500],
              border: 'none',
            },
          })}
        >
          {t('addColumn')}
        </Button>
      )}
      <Collapse in={isInEditMode}>
        {isInEditMode && (
          <ClickAwayListener onClickAway={onClickAway}>
            <Box sx={({ palette }) => ({ ...boardColumnWidth, p: 1, bgcolor: palette.background.paper })}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleCreateColumn}
                validateOnBlur={false}
              >
                <Form>
                  <TextField<FormValues, 'title'>
                    name="title"
                    variant="outlined"
                    disabled={isSaving}
                    fullWidth
                    autoFocus
                    autoComplete="off"
                    sx={{ mb: 1, '& input': { p: 1 } }}
                  />
                  <LoadingButton
                    loading={isSaving}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    type="submit"
                    sx={{ textTransform: 'none' }}
                  >
                    {t('addColumn')}
                  </LoadingButton>
                  <IconButton disabled={isSaving} onClick={endEdit}>
                    <CloseIcon />
                  </IconButton>
                </Form>
              </Formik>
            </Box>
          </ClickAwayListener>
        )}
      </Collapse>
    </Box>
  );
};

export { CreateBoardColumnButton };
