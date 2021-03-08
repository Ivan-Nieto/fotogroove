import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import Slide from '../../components/Slide/Slide';
import RenderSingUp from './RenderSignUp';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  blind: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Blind = () => {
  const theme = useTheme();
  const { blind } = useStyles(theme);

  return <div className={blind} />;
};

const Registration = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <Slide
        Primary={Blind}
        Secondary={RenderSingUp}
        direction='up'
        move={true}
        timeout={100}
      />
    </div>
  );
};

export default Registration;
