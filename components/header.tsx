import LoginIcon from '@mui/icons-material/Login';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

import { PATHS } from '~/config';
import { useAuthSelector } from '~/features/auth';

import { LanguageSwitch } from './LanguageSwitch';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const { t } = useTranslation('header');
  const { isAuthenticated } = useAuthSelector();

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
      </Toolbar>
    </AppBar>
  );
};

export { Header };
