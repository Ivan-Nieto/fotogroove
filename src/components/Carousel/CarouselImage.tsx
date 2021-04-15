import React, { useState } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    padding: 0,
    borderRadius: '7px',
  },
  clickable: {
    cursor: 'pointer',
  },
}));

const CarouselImage = ({
  src,
  alt,
  className,
  height,
  style,
  id,
}: {
  id?: string;
  style?: any;
  height?: number;
  src: string;
  alt?: string;
  className?: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  const { root, clickable } = useStyles();

  const handleClick = () => {
    const win = window.open(`/view-image?id=${id}`);
    win?.focus();
  };

  return (
    <>
      <img
        style={style}
        className={`${root} ${className || ''} ${id ? clickable : ''}`}
        onLoad={() => {
          setLoaded(true);
        }}
        src={src}
        alt={alt || 'carousel image'}
        {...(id ? { onClick: handleClick } : {})}
        height={height || 500}
      />
      {!loaded && <Skeleton animation='wave' variant='rect' height={height || 500} />}
    </>
  );
};

export default CarouselImage;
