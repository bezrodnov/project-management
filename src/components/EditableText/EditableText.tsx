import { MouseEvent, useRef, useState } from 'react';

import { Box, Input, Typography } from '@mui/material';

import { useBoolean } from '~/hooks';

import { EditableTextProps } from './EditableText.types';

const EditableText = ({ children, variant, onChange, ...other }: EditableTextProps) => {
  const [text, setText] = useState(children);
  const [isInEditMode, { on: startEdit, off: endEdit }] = useBoolean();
  const [isSaving, { on: startSave, off: endSave }] = useBoolean();

  const onInputBlur = async () => {
    // TODO: consider supporting loading state with disabled/readonly input
    if (onChange) {
      startSave();

      try {
        await onChange(text);
      } catch (e) {
        setText(children);
      } finally {
        endSave();
      }
    }

    endEdit();
  };

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    other.onClick?.(e);
    startEdit();
  };

  const typographyRef = useRef<HTMLSpanElement>(null);

  return (
    <Box {...other} sx={{ ...other.sx, position: 'relative', cursor: 'pointer' }} onClick={onClick}>
      <Typography
        ref={typographyRef}
        sx={
          isInEditMode
            ? {
                opacity: 0,
                pointerEvents: 'none',
              }
            : undefined
        }
        variant={variant}
      >
        {text.trim() ? text : '.' /* "." is to prevent root component collapse when there's no text to render */}
      </Typography>
      {isInEditMode && (
        <Input
          sx={({ spacing, typography }) => ({
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            left: typographyRef.current?.offsetLeft ?? 0,
            right: spacing(1),
            '& > input': {
              ...typography[variant],
            },
          })}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={onInputBlur}
          disabled={isSaving}
          autoFocus
        />
      )}
    </Box>
  );
};

export { EditableText };
