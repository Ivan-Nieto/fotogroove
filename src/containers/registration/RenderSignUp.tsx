import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
}));

const RenderSignUp = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return <div></div>;
};

export default RenderSignUp;
