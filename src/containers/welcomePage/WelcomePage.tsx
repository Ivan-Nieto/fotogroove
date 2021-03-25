import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import Gallery from '../gallery/Gallery';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 'calc(100% - 40px)',
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    padding: '20px',
    margin: 'auto',
  },
  welcomeMessage: {
    maxWidth: '700px',
    paddingBottom: '40px',
  },
  select: {
    maxWidth: '250px',
    maxHeight: '250px',
    height: '100%',
    width: '100%',

    position: 'absolute',
    zIndex: 1,

    padding: '10px',
  },
  selectText: {
    width: '100%',
    fontSize: '34px',
    fontStyle: 'oblique 20deg',
    paddingLeft: '10px',
    color: theme.palette.secondary.main,
    textShadow: `0px 0px 30px ${theme.palette.common.white},0px 0px 30px ${theme.palette.common.white},0px 0px 10px ${theme.palette.common.white}`,
    '&:hover': {
      color: 'white',
      textShadow: '0px 0px 30px white,0px 0px 30px white,0px 0px 10px white',
    },
  },
  disabledText: {
    cursor: 'pointer',
    fontSize: '18px',
    color: theme.palette.grey[400],
  },
}));

const WelcomePage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [activeFilter, setActiveFilter] = useState(0);
  const filters = ['Latest', 'Most Viewed', 'Most Favorites'];

  const isLastFilter = (index: number) => {
    return (
      index === activeFilter + 1 ||
      (index === 0 && activeFilter + 1 >= filters.length)
    );
  };

  const isNextFilter = (index: number) => {
    return (
      index === activeFilter - 1 ||
      (activeFilter - 1 < 0 && index === filters.length - 1)
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.select}>
        {filters.map(
          (e: string, index: number) =>
            isNextFilter(index) && (
              <div
                key={`sub-text-prv-${index}`}
                onClick={() =>
                  setActiveFilter(
                    activeFilter - 1 < 0 ? filters.length - 1 : activeFilter - 1
                  )
                }
              >
                <Typography className={classes.disabledText} variant='body1'>
                  {e}
                </Typography>
              </div>
            )
        )}

        {filters.map(
          (e: string, index: number) =>
            index === activeFilter && (
              <Typography
                key={`text-${index}`}
                className={classes.selectText}
                variant='body1'
              >
                {e}
              </Typography>
            )
        )}

        {filters.map(
          (e: string, index: number) =>
            isLastFilter(index) && (
              <div
                key={`sub-text-post-${index}`}
                onClick={() =>
                  setActiveFilter(
                    activeFilter + 1 >= filters.length ? 0 : activeFilter + 1
                  )
                }
              >
                <Typography className={classes.disabledText} variant='body1'>
                  {e}
                </Typography>
              </div>
            )
        )}
      </div>
      <div className={classes.title}>
        <Typography variant='h3'>Welcome to Fotogroove!</Typography>
      </div>
      <div className={`${classes.title} ${classes.welcomeMessage}`}>
        <Typography variant='body1'>
          You can sing in or create an account and start showing off your own
          images. Fotogroove is intended for everybody, so whether your looking
          to show off your gallery or just want to share your work fotogroove is
          the right place for you.
        </Typography>
      </div>
      <Gallery targetAccount='all' />
    </div>
  );
};

export default WelcomePage;
