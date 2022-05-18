import { useTranslation } from 'next-i18next';
import Head from 'next/head';

import { PageTitleProps } from './PageTitle.types';

const PageTitle = ({ title }: PageTitleProps) => {
  const { t } = useTranslation('common');

  return (
    <Head>
      <title>{t('pageTitle', { title })}</title>
    </Head>
  );
};

export { PageTitle };
