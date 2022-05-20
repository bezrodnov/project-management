import { Dispatch, MouseEvent } from 'react';

import { TypographyProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

export type EditableTextProps = Omit<TypographyProps, 'children' | 'variant' | 'style' | 'onClick' | 'onChange'> & {
  variant: Variant;
  /**
   * A text change handler. If it rejects then
   * the text will be reverted back to the original one.
   */
  onChange?: (newValue: string) => PromiseLike<unknown>;
  children: string;
  onClick?: Dispatch<MouseEvent<HTMLDivElement>>;
};
