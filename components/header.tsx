import { Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './header.module.scss';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  const router = useRouter();
  const { t } = useTranslation('header');

  return (
    <header className={styles.header}>
      {title}
      <Link href={router.asPath} locale={router.locale === 'en' ? 'ru' : 'en'}>
        <Button variant="contained" sx={{ ml: 2, mr: 2 }}>
          {t('changeLocale')}
        </Button>
      </Link>
    </header>
  );
};

export default Header;
