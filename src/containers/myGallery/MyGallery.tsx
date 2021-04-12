import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import useUser from '../../hooks/useUser';

import Gallery from '../gallery/Gallery';
import Carousel from '../../components/Carousel/Carousel';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '50px',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const MyGallery = () => {
  const user = useUser();
  const { root } = useStyles();
  const [favorites] = useState([]);

  return (
    <div className={root}>
      {favorites.length > 0 && <Carousel images={favorites} />} <Gallery targetAccount={user?.uid} />;
    </div>
  );
};

export default MyGallery;
