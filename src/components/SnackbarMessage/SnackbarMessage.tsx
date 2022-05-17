import { CloseOutlined } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SnackbarMessageProps } from './SnackbarMessage.types';

const SnackbarMessage = ({ title, description, type, closeSnackbar }: SnackbarMessageProps) => (
  <Paper
    sx={(theme) => ({ p: 2, backgroundColor: theme.palette[type].light, color: theme.palette[type].contrastText })}
  >
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6">{title}</Typography>
      {closeSnackbar && (
        <IconButton onClick={closeSnackbar}>
          <CloseOutlined sx={(theme) => ({ color: theme.palette[type].contrastText })} />
        </IconButton>
      )}
    </Stack>
    {description && (
      <Typography variant="body2" sx={{ mt: 2 }}>
        {description}
      </Typography>
    )}
  </Paper>
);

export { SnackbarMessage };
