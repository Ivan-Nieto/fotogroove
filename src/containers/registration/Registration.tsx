import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import Slide from '../../components/Slide/Slide';
import RenderSingUp from './RenderSignUp';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  blind: {
    backgroundColor: theme.palette.common.white,
    width: '100vw',
    height: '100vh',
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
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFlip(true);
    }, 300);
  }, []);

  return (
    <div className={classes.root}>
      <Slide
        Primary={Blind}
        Secondary={RenderSingUp}
        direction='down'
        move={flip}
        timeout={100}
      />
    </div>
  );
};

export default Registration;
