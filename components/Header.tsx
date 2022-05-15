import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, Toolbar } from '@mui/material';

import { PATHS } from '~/config';
import { useAppDispatch } from '~/store';
import { signOff, useAuthSelector } from '~/store/authSlice';

import { LanguageSwitch } from './LanguageSwitch2';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const { t } = useTranslation('header');
  const { isAuthenticated } = useAuthSelector();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSignOff = () => {
    dispatch(signOff()).then(() => {
      router.push(PATHS.HOME);
    });
  };

  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        {title}
        <Box sx={{ flexGrow: 1 }} />
        <LanguageSwitch />
        {!isAuthenticated && (
          <Link href={PATHS.SIGN_IN}>
            <Button startIcon={<LoginIcon />} sx={{ ml: 2 }}>
              {t('signIn')}
            </Button>
          </Link>
        )}
        {isAuthenticated && (
          <Button onClick={onSignOff} startIcon={<LogoutIcon />} sx={{ ml: 2 }}>
            {t('signOff')}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export { Header };
