import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import useScroll from '../../hooks/useScroll';
import usePaginate from '../../hooks/usePagination';

import SelectionWheel from '../../components/SelectionWheel/SelectionWheel';
import { firestore } from '../../firebase/init';
import { getDownloadUrls } from '../../firebase/firestore/firestore';
import RenderImageGallery from '../../components/RenderImageGallery/RenderImageGallery';

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
  const bottomHit = useScroll();
  const dbRefs = [
    firestore.collection('images').where('visibility', '==', 'PUBLIC').orderBy('rating', 'desc').orderBy('createDate', 'desc'),
    firestore.collection('images').where('visibility', '==', 'PUBLIC').orderBy('views', 'desc').orderBy('createDate', 'desc'),
    firestore.collection('images').where('visibility', '==', 'PUBLIC').orderBy('favorites', 'desc').orderBy('createDate', 'desc'),
  ];
  const [activeFilter, setActiveFilter] = useState(-1);
  const [images, , loading, setChangeQuery] = usePaginate(bottomHit, dbRefs[0], ['rating', 'createDate'], 15, getDownloadUrls, true);

  React.useEffect(() => {
    if (activeFilter === -1) return;
    setChangeQuery(dbRefs[activeFilter]);
    // eslint-disable-next-line
  }, [activeFilter]);

  return (
    <div className={classes.root}>
      <div className={classes.select}>
        <SelectionWheel
          options={['Latest', 'Most Viewed', 'Most Favorites']}
          activeOption={activeFilter === -1 ? 0 : activeFilter}
          setActiveOption={setActiveFilter}
        />
      </div>
      <div className={classes.title}>
        <Typography variant='h3'>Welcome to Fotogroove!</Typography>
      </div>
      <div className={`${classes.title} ${classes.welcomeMessage}`}>
        <Typography variant='body1'>
          You can sing in or create an account and start showing off your own images. Fotogroove is intended for everybody, so whether your
          looking to show off your gallery or just want to share your work, fotogroove is the right place for you.
        </Typography>
      </div>

      <RenderImageGallery images={images} onEmptyMessage={loading ? 'Loading...' : 'Nothing found :/'} />
    </div>
  );
};

export default WelcomePage;
