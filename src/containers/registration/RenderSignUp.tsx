import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.grey[800],
  },
}));

const RenderSignUp = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <p>This is also a test</p>
    </div>
  );
};

export default RenderSignUp;
