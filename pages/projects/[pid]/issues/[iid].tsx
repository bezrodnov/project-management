import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Layout } from '~/components/Layout';
import { getProtectedPageServerSideProps } from '~/utils/getProtectedPageServerSideProps';

const Issue = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { t } = useTranslation('issue');

  const router = useRouter();
  const { pid, iid: id, comment } = router.query;

  return (
    <Layout title={t('title', { id })} isAuthenticated={isAuthenticated}>
      <p>{t('description', { id, pid })}</p>
      {comment !== undefined && <span>comment id: #{comment}</span>}
      <h2 className="title">
        <Link href="/">
          <a>{t('home')}</a>
        </Link>
      </h2>
    </Layout>
  );
};

export const getServerSideProps = getProtectedPageServerSideProps({
  getAdditionalProps: async ({ locale = 'en' }) => ({
    props: {
      ...(await serverSideTranslations(locale, ['issue', 'header'])),
    },
  }),
});

export default Issue;
