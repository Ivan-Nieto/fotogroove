import React, { useState } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ArrowRight from '@material-ui/icons/ArrowForwardIos';
import { useSprings, animated as a } from 'react-spring';
import IconButton from '@material-ui/core/IconButton';

import CarouselImage from './CarouselImage';

const useStyles = (height?: number, width?: number) =>
  makeStyles((theme: Theme) => ({
    root: {
      minHeight: '550px',
      maxWidth: 'calc(100vw)',

      ...(height ? { height } : {}),
      ...(width ? { width } : {}),
      margin: '0px',
      padding: '0px 10px 10px 0px',

      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative',
    },
    arrowLeft: {
      height: '100%',
      position: 'relative',
      verticalAlign: 'middle',
      marginLeft: '15px',
      margin: 'auto',
      color: theme.palette.common.white,
      zIndex: 1,
    },
    imgContainer: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      willChange: 'transform',
    },
    arrowRight: {
      height: '100%',
      position: 'relative',
      marginRight: '0px',
      margin: 'auto',
      verticalAlign: 'middle',
      zIndex: 1,
      color: theme.palette.common.white,
    },
    img: {
      position: 'relative',
    },
  }));

interface Props {
  children?: any;
  width?: number;
  height?: number;
}

// Inspiration https://codepen.io/supah/pen/VwegJwV
// and https://codesandbox.io/s/improved-carousel-envjk?from-embed=&file=/src/Slider.js
const Slide = ({ children, width, height }: Props) => {
  const theme = useTheme();
  const windowWidth = width || (window?.innerWidth || document?.documentElement?.clientWidth || document?.body?.clientWidth) - 40;

  const classes = useStyles(height, width)(theme);
  const numItems = children?.length || 0;
  const [active, setActive] = useState(0);
  const [disableBack, setDisableBack] = useState(numItems === 2);
  const [disableForward, setDisableForward] = useState(false);

  const getInitialConfig = (i: number) => {
    if (numItems > 1 && i === numItems - 1 && numItems !== 2)
      return {
        left: -1 * windowWidth,
        opacity: 1,
        height: height || 'auto',
        immediate: false,
      };
    return {
      left: i === active ? 0 : windowWidth,
      height: height || 'auto',
      immediate: false,
      opacity: 1,
    };
  };
  const [springs, set]: any = useSprings(numItems, (i) => {
    return { ...getInitialConfig(i) };
  });

  const handleChange = (forward: boolean) => () => {
    let nextIndex = forward ? active + 1 : active - 1;
    nextIndex = nextIndex < 0 ? numItems - 1 : nextIndex;
    nextIndex = nextIndex >= numItems ? 0 : nextIndex;
    setActive(nextIndex);

    if (numItems === 2) {
      setDisableForward(forward);
      setDisableBack(!forward);
    }

    set((i: any) => {
      switch (i) {
        // Going into view
        case nextIndex:
          return {
            opacity: 1,
            height: height || 'auto',
            immediate: false,
            left: 0,
          };
        // In view moving out of view
        case active:
          return {
            opacity: 0,
            height: height || 'auto',
            immediate: false,
            left: forward ? -1 * windowWidth : windowWidth,
          };
        default:
          return {
            left: forward ? windowWidth : -1 * windowWidth,
            height: height || 'auto',
            immediate: true,
            opacity: 0,
          };
      }
    });
  };

  return (
    <div className={classes.root}>
      {numItems > 1 && (
        <>
          <IconButton disabled={disableBack} className={classes.arrowLeft} onClick={handleChange(false)}>
            <ArrowBack />
          </IconButton>
          <IconButton disabled={disableForward} className={classes.arrowRight} onClick={handleChange(true)}>
            <ArrowRight />
          </IconButton>
        </>
      )}
      {springs.map((props: any, index: number) => (
        <a.div key={`carousel-image-container-${index}`} className={classes.imgContainer} style={props} children={children[index]} />
      ))}
    </div>
  );
};

const Carousel = ({ images = [] }: { images: { src: string; id?: string }[] }) => {
  const theme = useTheme();
  const classes = useStyles()(theme);

  const windowWidth = Math.floor(window?.innerWidth || document?.documentElement?.clientWidth || document?.body?.clientWidth);
  const height = Math.floor((window?.innerHeight || document?.documentElement?.clientHeight || document?.body?.clientHeight) * 0.8);
  const maxHeight = Math.min(Math.floor(windowWidth / 1.8), height);

  return (
    <Slide height={maxHeight}>
      {images.map((e, index) => (
        <CarouselImage className={classes.img} key={`carousel-image-${index}`} height={maxHeight} id={e?.id} src={e?.src} alt={`img-${index}`} />
      ))}
    </Slide>
  );
};

export default Carousel;
