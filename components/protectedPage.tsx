import { ReactNode } from 'react';

import { useRouter } from 'next/router';

const ProtectedPage = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  return children;
};

export { ProtectedPage };
