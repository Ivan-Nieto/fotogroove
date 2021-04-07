import React, { useState, useEffect } from 'react';
import { useTheme, Theme, makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { useSpring, animated as a } from 'react-spring';

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    background: 'grey',
    border: `1px solid ${theme.palette.grey[200]}`,
    margin: 0,
    padding: 0,
    borderRadius: '7px',
    boxShadow: `0px 10px 15px -5px ${theme.palette.grey[200]}`,
    transition: 'box-shadow 0.5s',
    willChange: 'transform',
  },
}));

interface Image {
  thumbUrl: {
    portrait: string;
    landscape: string;
  };
  url: string;
  resolution: { width: number; height: number; ratio: string };
  tags: string[];
  collection: string[];
  visibility: string;
  rating: number;
  description: string;
  name: string;
  author: string;
  createDate: any;
  favorites: number;
  views: number;
  allowDownload: boolean;
  metadata: Record<string, any>;
}

interface DisplayImageProps {
  size?: 'small' | 'large';
  image: Image;
}

const DisplayImage = ({ size, image }: DisplayImageProps) => {
  const theme = useTheme();
  const [url, setUrl] = useState('');
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles(theme);

  const trans = (x: any, y: any, s: any) => `scale(${s})`;
  const [props, setProps] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 210, friction: 20 } }));

  useEffect(() => {
    const portraitLarge = image?.thumbUrl?.portrait;
    const portraitSmall = image?.thumbUrl?.portrait;
    const landscapeLarge = image?.thumbUrl?.landscape;
    const landscapeSmall = image?.thumbUrl?.landscape;

    const defaultImage = portraitSmall || portraitLarge || landscapeLarge || landscapeSmall;

    switch (size) {
      case 'large':
        setUrl(portraitLarge || defaultImage);
        break;
      case 'small':
        setUrl(portraitSmall || defaultImage);
        break;
      default:
        setUrl(defaultImage);
    }
  }, [size, setUrl, image]);

  return (
    <>
      <a.img
        alt={image?.description || ''}
        onLoad={() => setLoaded(true)}
        src={url}
        width={size === 'small' ? 300 : 680}
        height={size === 'small' ? 200 : 400}
        className={classes.card}
        onMouseMove={() => setProps({ xys: [0, 0, 1.01] })}
        onMouseLeave={() => setProps({ xys: [0, 0, 1] })}
        // @ts-ignore
        style={{ transform: props?.xys?.interpolate(trans) }}
      />

      {!loaded && <Skeleton animation='wave' variant='rect' width={size === 'small' ? 300 : 680} height={size === 'small' ? 200 : 400} />}
    </>
  );
};

export default DisplayImage;
