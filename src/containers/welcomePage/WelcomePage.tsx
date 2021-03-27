import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import SelectionWheel from '../../components/SelectionWheel/SelectionWheel';
import RenderLatest from './RenderLatest';
import RenderFavorites from './RenderFavorites';
import RenderPopular from './RenderPopular';

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
    position: 'absolute',
    zIndex: 1,
  },
}));

const WelcomePage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <div className={classes.root}>
      <div className={classes.select}>
        <SelectionWheel
          options={['Latest', 'Most Viewed', 'Most Favorites']}
          activeOption={activeFilter}
          setActiveOption={setActiveFilter}
        />
      </div>
      <div className={classes.title}>
        <Typography variant='h3'>Welcome to Fotogroove!</Typography>
      </div>
      <div className={`${classes.title} ${classes.welcomeMessage}`}>
        <Typography variant='body1'>
          You can sing in or create an account and start showing off your own
          images. Fotogroove is intended for everybody, so whether your looking
          to show off your gallery or just want to share your work, fotogroove
          is the right place for you.
        </Typography>
      </div>
      {activeFilter === 0 && <RenderLatest />}
      {activeFilter === 1 && <RenderPopular />}
      {activeFilter === 2 && <RenderFavorites />}
    </div>
  );
};

export default WelcomePage;
