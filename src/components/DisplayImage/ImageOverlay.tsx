import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

import { Image } from './DisplayImage.types';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  icon: {
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
  ownsImage: boolean;
  image: Image;
  style?: any;
  user: any;
}

const ImageOverlay = ({ image, user }: Props) => {
  const classes = useStyles();
  const [staredImage, setStaredImage] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [disabledFeatured, setDisabledFeatured] = useState(false);

  useEffect(() => {
    if (!Boolean(user?.isSignedIn)) return;

    const favoritesCollection = user?.collections?.filter((e: any) => e?.name === 'Favorites')[0];
    if (favoritesCollection?.images?.includes(image?.id)) setStaredImage(true);

    if (user?.userDoc?.featured?.includes(image?.id)) setIsFeatured(true);
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

  const handleClickFeatured = async () => {
    setDisabledFeatured(true);

    const addingFeatured = !isFeatured;
    setIsFeatured(!isFeatured);

    if (image?.id)
      await firebase
        .firestore()
        .collection('users')
        .doc(user?.uid)
        .update({
          featured: addingFeatured ? firebase.firestore.FieldValue.arrayUnion(image.id) : firebase.firestore.FieldValue.arrayRemove(image.id),
        })
        .catch(() => {});

    setDisabledFeatured(false);
  };

  return (
    <div className={classes.root}>
      {user?.isSignedIn && (
        <div className={classes.icon}>
          {staredImage ? (
            <Tooltip title='Remove from Favorites'>
              <IconButton onClick={disabled ? () => {} : handleClick} color='inherit'>
                <FavoriteIcon color='inherit' />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title='Add to Favorites'>
              <IconButton onClick={disabled ? () => {} : handleClick} color='inherit'>
                <FavoriteBorderIcon color='inherit' />
              </IconButton>
            </Tooltip>
          )}
          {image?.author === user?.uid && (
            <>
              {isFeatured ? (
                <Tooltip title='Remove from Featured'>
                  <IconButton onClick={disabledFeatured ? () => {} : handleClickFeatured} color='inherit'>
                    <StarIcon color='inherit' />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title='Add to Featured'>
                  <IconButton onClick={disabledFeatured ? () => {} : handleClickFeatured} color='inherit'>
                    <StarBorderIcon color='inherit' />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageOverlay;
