import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Box, Button, Toolbar } from '@mui/material';

import { signOff } from '~/api/auth';
import { LanguageSwitch } from '~/components/LanguageSwitch';
import { PATHS } from '~/config';

import { HeaderProps } from './Header.types';

const Header = ({ title, isAuthenticated }: HeaderProps) => {
  const { t } = useTranslation('header');

  const router = useRouter();

  const onSignOff = async () => {
    await signOff();
    router.push(PATHS.HOME);
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
