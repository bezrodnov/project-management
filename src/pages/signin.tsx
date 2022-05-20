import { useState } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Container, Paper, Stack, Typography } from '@mui/material';

import * as Yup from 'yup';

import { signIn } from '~/api/auth';
import { PageTitle } from '~/components';
import { Form, Formik, TextField, ValidationSchemaBuilder, useValidationSchema } from '~/components/formik';
import { PATHS } from '~/config';
import { useSnackbar } from '~/hooks';
import { getUnauthorizedPageServerSideProps } from '~/utils/getUnauthorizedPageServerSideProps';

type FormValues = {
  login: string;
  password: string;
};

const initialValues: FormValues = { login: '', password: '' };

const valdiationSchemaBuilder: ValidationSchemaBuilder<FormValues> = (t) =>
  Yup.object().shape({
    login: Yup.string().required(t('common:forms.fieldIsRequired')),
    password: Yup.string().required(t('common:forms.fieldIsRequired')),
  });

const SignIn = () => {
  const { t } = useTranslation(['signin', 'common']);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (credentials: FormValues) => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      await signIn(credentials);
      router.push(PATHS.BOARDS);
    } catch (e) {
      const status = typeof e === 'number' ? e : 500;
      enqueueSnackbar({
        title: t('signInFailed'),
        description: t(`signInErrors.${status}`, t('signInErrors.default')),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = useValidationSchema(valdiationSchemaBuilder);

  return (
    <>
      <PageTitle title={t('signin:title')} />
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
                <Button type="submit" variant="contained" fullWidth sx={{ p: 1 }} disabled={loading}>
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
    </>
  );
};

export const getServerSideProps = getUnauthorizedPageServerSideProps({ i18nextNamespaces: ['signin'] });

export default SignIn;
