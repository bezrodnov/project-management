import { Dispatch, MouseEvent } from 'react';

import { TypographyProps } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

export type EditableTextProps = Omit<TypographyProps, 'children' | 'variant' | 'style' | 'onClick' | 'onChange'> & {
  variant: Variant;
  /**
   * A text change handler function. If this function returns false, then
   * the text will be reverted back to the original one.
   */
  onChange?: (newValue: string) => boolean | unknown | PromiseLike<boolean> | PromiseLike<unknown>;
  children: string;
  onClick?: Dispatch<MouseEvent<HTMLDivElement>>;
};
