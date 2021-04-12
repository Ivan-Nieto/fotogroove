import React, { useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    background: 'grey',
    margin: 0,
    padding: 0,
    borderRadius: '7px',
  },
}));

const CarouselImage = ({
  src,
  alt,
  className,
  height,
  style,
}: {
  style?: any;
  height?: number;
  src: string;
  alt?: string;
  className?: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  const { root } = useStyles();

  return (
    <>
      <img
        style={style}
        className={`${root} ${className || ''}`}
        onLoad={() => setLoaded(true)}
        src={src}
        alt={alt || 'carousel image'}
        height={height || 500}
      />
      {!loaded && <Skeleton animation='wave' variant='rect' height={height || 500} />}
    </>
  );
};

export default React.memo(CarouselImage);
