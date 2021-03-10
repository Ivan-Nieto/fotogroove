import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

interface ErrorProps {
  error: string | null;
}

const useClasses = makeStyles((theme) => ({
  error_box: {
    backgroundColor: theme.palette.error.light,

    margin: '3px 0px 6px 0px',
    borderRadius: '3px',
    maxWidth: '274px',
    padding: '0 5px',
  },
  error_text: {
    color: theme.palette.error.main,
  },
}));

const Error = ({ error }: ErrorProps) => {
  const theme = useTheme();
  const { error_box, error_text } = useClasses(theme);
  if (!error) return null;
  return (
    <div className={error_box}>
      <Typography className={error_text} variant='caption'>
        {error}
      </Typography>
    </div>
  );
};

export default Error;
