import { useState } from 'react';

import { useTranslation } from 'next-i18next';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, ClickAwayListener, Collapse, IconButton } from '@mui/material';

import * as Yup from 'yup';

import { Form, Formik, TextField, ValidationSchemaBuilder, useValidationSchema } from '~/components/formik';
import { useBoolean } from '~/hooks';
import { boardColumnWidth } from '~/styles/BoardColumn';

import { CreateBoardColumnProps } from './CreateBoardColumn.types';

type FormValues = {
  title: string;
};

const initialValues: FormValues = { title: '' };

const valdiationSchemaBuilder: ValidationSchemaBuilder<FormValues> = (t) =>
  Yup.object().shape({
    title: Yup.string().required(t('common:forms.fieldIsRequired')),
  });

const CreateBoardColumn = ({ onColumnCreated }: CreateBoardColumnProps) => {
  const { t } = useTranslation('board');

  const [isInEditMode, { on: beginEdit, off: endEdit }] = useBoolean();

  const handleCreateColumn = ({ title }: FormValues) => onColumnCreated(title).then(endEdit);

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
          <ClickAwayListener onClickAway={endEdit}>
            <Box sx={(theme) => ({ ...boardColumnWidth, p: 1, bgcolor: theme.palette.background.paper })}>
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
                    fullWidth
                    autoFocus
                    autoComplete="off"
                    sx={{ mb: 1, '& input': { p: 1 } }}
                  />
                  <Button variant="contained" type="submit" sx={{ textTransform: 'none' }}>
                    {t('addColumn')}
                  </Button>
                  <IconButton onClick={endEdit}>
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

export { CreateBoardColumn };
