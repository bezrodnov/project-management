import { ReactNode } from 'react';

import { SxProps } from '@mui/material';

export type LayoutProps = {
  children?: ReactNode;
  disableScroll?: boolean;
  title: string;
  isAuthenticated: boolean;
  sx?: SxProps;
  className?: string;
};
