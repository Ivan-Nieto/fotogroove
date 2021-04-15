import React from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import { Image } from './DisplayImage.types';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',

    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 0,
  },

  container: {
    padding: '7px',
    width: 'calc(100% - 14px)',

    color: `${theme.palette.grey[400]} !important`,
    borderRadius: '0px 0px 7px 7px',
    backgroundColor: 'rgba(37, 40, 43, 0.8)',
    backdropFilter: 'blur(5px)',
  },
}));

interface Props {
  ownsImage: boolean;
  image: Image;
  style?: any;
  user: any;
}

const ImageOverlayBottom = ({ image }: Props) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const resolution = `${image?.resolution?.width} x ${image?.resolution?.height}`;
  const hasResolution = Boolean(image?.resolution?.width) && Boolean(image?.resolution?.height);

  return (
    <div className={classes.root}>
      {hasResolution && <div className={classes.container}>{hasResolution && <Typography variant='subtitle1'>{resolution}</Typography>}</div>}
    </div>
  );
};

export default ImageOverlayBottom;
