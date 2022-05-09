import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import * as Yup from 'yup';

import { Form, Formik, TextField, ValidationSchemaBulder, useValidationSchema } from '~/components/formik';
import { PATHS } from '~/config';

type FormValues = {
  login: string;
  password: string;
};

const initialValues: FormValues = { login: '', password: '' };

const valdiationSchemaBulder: ValidationSchemaBulder<FormValues> = (t) =>
  Yup.object().shape({
    login: Yup.string().required(t('common:forms.fieldIsRequired')),
    password: Yup.string().required(t('common:forms.fieldIsRequired')),
  });

const SignIn = () => {
  const { t } = useTranslation(['signin', 'common']);

  const validationSchema = useValidationSchema(valdiationSchemaBulder);

  const onSubmit = () => {
    //
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
    >
      <Paper>
        <Typography textAlign="center" variant="h3" sx={{ mt: 2 }}>
          {t('signin:title')}
        </Typography>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form>
            <Stack p={4} spacing={2}>
              <TextField<FormValues, 'login'> name="login" label={t('signin:login')} />
              <TextField<FormValues, 'password'> name="password" label={t('signin:password')} type="password" />
              <Button type="submit" variant="contained" fullWidth sx={{ p: 1 }}>
                <Typography variant="body2">{t('signin:signIn')}</Typography>
              </Button>
              <Stack flexDirection="row" justifyContent="center" alignItems="center">
                <Typography variant="body2" sx={{ mr: 1 }}>
                  {t('signin:signUpPrompt')}
                </Typography>
                <Link href={PATHS.SIGN_UP}>
                  <a>
                    <Typography variant="body2">{t('signin:signUp')}</Typography>
                  </a>
                </Link>
              </Stack>
            </Stack>
          </Form>
        </Formik>
      </Paper>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['signin', 'common'])),
  },
});

export default SignIn;
