import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Zoom from '../../components/Zoom/Zoom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      margin: 0,
      padding: 0,
      borderRadius: '7px',
      display: 'block',
    },
    root: {
      overflow: 'hidden',
      willChange: 'transform',
      display: 'flex',
      padding: '0',

      justifyContent: 'center',
    },
    overlay: {
      cursor: 'pointer',

      top: 0,
      zIndex: 1,

      position: 'absolute',
      padding: '5px',
      width: 'calc(100% - 10px)',
      height: 'calc(100% - 10px)',

      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '7px',

      color: theme.palette.common.white,
      backgroundColor: 'rgba(37, 40, 43, 0.75)',
      backdropFilter: 'blur(2px)',
    },
    textContainer: {
      display: 'block',
      padding: '10px',

      height: 'calc(100% - 20px)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      display: 'flex',
      overflowWrap: 'break-word',
      maxWidth: '300px',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      verticalAlign: 'center',
    },
  })
);

const ImageCard = ({
  onClick,
  url,
  size,
  title,
  className,
}: {
  onClick?: () => void | undefined;
  className?: string;
  title: string;
  size: 'small' | 'large';
  url: string;
}) => {
  const classes = useStyles();

  const cutString = (str: string, maxLength: number) => {
    const temp = str?.toString();
    if (temp.length > maxLength && maxLength > 3) return `${temp.substr(0, maxLength - 3)}...`;
    return temp;
  };

  return (
    <div onClick={onClick} className={`${classes.root} ${className || ''}`}>
      <Zoom>
        <img src={url} className={classes.img} alt='' width={size === 'small' ? 300 : 680} height={size === 'small' ? 200 : 400} />
        <div className={classes.overlay}>
          <div className={classes.textContainer}>
            <Typography variant='h4' color='inherit' className={classes.text}>
              {cutString(title, 45)}
            </Typography>
          </div>
        </div>
      </Zoom>
    </div>
  );
};

export default ImageCard;
