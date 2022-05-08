import { AppBar, Box, Toolbar } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import LanguageSwitch from './languageSwitch';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <AppBar position="sticky" color="default">
      <Toolbar>
        {title}
        <Box sx={{ flexGrow: 1 }} />
        <LanguageSwitch />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
