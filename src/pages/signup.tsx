import { useState } from 'react';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Container, Paper, Stack, Typography } from '@mui/material';

import * as Yup from 'yup';

import { signIn, signUp } from '~/api/auth';
import { PageTitle } from '~/components';
import { Form, Formik, TextField, ValidationSchemaBuilder, useValidationSchema } from '~/components/formik';
import { PATHS } from '~/config';
import { useSnackbar } from '~/hooks';
import { getUnauthorizedPageServerSideProps } from '~/utils/getUnauthorizedPageServerSideProps';

type FormValues = {
  name: string;
  login: string;
  password: string;
  passwordRepeat: string;
};

const initialValues: FormValues = { name: '', login: '', password: '', passwordRepeat: '' };

const valdiationSchemaBuilder: ValidationSchemaBuilder<FormValues> = (t) =>
  Yup.object().shape({
    name: Yup.string().required(t('common:forms.fieldIsRequired')),
    login: Yup.string().required(t('common:forms.fieldIsRequired')),
    password: Yup.string().required(t('common:forms.fieldIsRequired')),
    passwordRepeat: Yup.string().test({
      name: 'equalTo',
      exclusive: false,
      message: t('signup:passwordsMissmatch'),
      test: (passwordRepeat, context) => passwordRepeat === context.resolve(Yup.ref('password')),
    }),
  });

const SignUp = () => {
  const { t } = useTranslation(['signup', 'common']);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async ({ name, login, password }: FormValues) => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      await signUp({ name, login, password });
      try {
        await signIn({ login, password });
        router.push(PATHS.HOME);
      } catch (e) {
        enqueueSnackbar({ title: t('signInFailed'), type: 'error' });
      }
    } catch (e) {
      const status = typeof e === 'number' ? e : 500;
      enqueueSnackbar({
        title: t('signUpFailed'),
        description: t(`signUpErrors.${status}`, t('signUpErrors.default')),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = useValidationSchema(valdiationSchemaBuilder);

  return (
    <>
      <PageTitle title={t('signup:title')} />
      <Container
        maxWidth="sm"
        sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Paper>
          <Typography textAlign="center" variant="h3" sx={{ mt: 2 }}>
            {t('signup:title')}
          </Typography>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
              <Stack p={4} spacing={2}>
                <TextField<FormValues, 'name'> name="name" label={t('signup:name')} />
                <TextField<FormValues, 'login'> name="login" label={t('signup:login')} />
                <TextField<FormValues, 'password'> name="password" label={t('signup:password')} type="password" />
                <TextField<FormValues, 'passwordRepeat'>
                  name="passwordRepeat"
                  label={t('signup:passwordRepeat')}
                  type="password"
                />
                <Button type="submit" variant="contained" fullWidth sx={{ p: 1 }} disabled={loading}>
                  <Typography variant="body2">{t('signup:signUp')}</Typography>
                </Button>
                <Stack flexDirection="row" justifyContent="center" alignItems="center">
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    {t('signup:signInPrompt')}
                  </Typography>
                  <Link href={PATHS.SIGN_IN}>
                    <a>
                      <Typography variant="body2">{t('signup:signIn')}</Typography>
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

export const getServerSideProps = getUnauthorizedPageServerSideProps({ i18nextNamespaces: ['signup'] });

export default SignUp;
