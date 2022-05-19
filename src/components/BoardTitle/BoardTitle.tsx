import { useState } from 'react';

import { Paper } from '@mui/material';

import { updateBoard } from '~/api/boards';
import { EditableText } from '~/components';

import { BoardTitleProps } from './BoardTitle.types';

const BoardTitle = ({ id, title: initialTitle }: BoardTitleProps) => {
  const [title, setTitle] = useState(initialTitle);

  const onChange = async (newTitle: string) => {
    if (!newTitle.trim()) {
      return false;
    }

    setTitle(newTitle);
    return updateBoard({ id, title: newTitle }).catch(() => {
      // TODO: show some message in snackbar
      return false;
    });
  };

  return (
    <Paper sx={{ alignSelf: 'flex-start', m: 2 }}>
      <EditableText sx={{ p: 2 }} variant="body1" onChange={onChange}>
        {title}
      </EditableText>
    </Paper>
  );
};

export { BoardTitle };
