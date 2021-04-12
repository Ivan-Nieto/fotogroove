import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { Image } from './DisplayImage.types';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  favoriteStar: {
    padding: '7px',
    width: 'calc(100% - 14px)',
    display: 'flex',

    color: '#F96969 !important',
    borderRadius: '7px 7px 0px 0px',
    backgroundColor: 'rgba(37, 40, 43, 0.8)',
    backdropFilter: 'blur(5px)',
  },
}));

interface Props {
  ownsImage?: boolean;
  image: Image;
  style?: any;
  user: any;
}

const ImageOverlay = ({ image, ownsImage, user }: Props) => {
  const classes = useStyles();
  const [staredImage, setStaredImage] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const favoritesCollection = user?.collections?.filter((e: any) => e?.name === 'Favorites')[0];
    if (favoritesCollection?.images?.includes(image?.id)) setStaredImage(true);
  }, [user, image]);

  const handleClick = async () => {
    setDisabled(true);

    const addingImage = !staredImage;
    setStaredImage(!staredImage);
    const favoritesCollection = user?.collections?.filter((e: any) => e?.name === 'Favorites')[0];

    if (user?.uid && image?.id && favoritesCollection?.docId)
      await firebase
        .firestore()
        .collection('users')
        .doc(user.uid)
        .collection('collections')
        .doc(favoritesCollection.docId)
        .update({
          images: addingImage ? firebase.firestore.FieldValue.arrayUnion(image.id) : firebase.firestore.FieldValue.arrayRemove(image.id),
        })
        .catch(console.error);

    setDisabled(false);
  };

  return (
    <div className={classes.root}>
      {ownsImage && (
        <div className={classes.favoriteStar}>
          {staredImage ? (
            <Tooltip title='Add to Favorites'>
              <IconButton disabled={disabled} onClick={handleClick} color='inherit'>
                <FavoriteIcon color='inherit' />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title='Remove from Favorites'>
              <IconButton disabled={disabled} onClick={handleClick} color='inherit'>
                <FavoriteBorderIcon color='inherit' />
              </IconButton>
            </Tooltip>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageOverlay;
