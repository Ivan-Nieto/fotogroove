import React, { useEffect } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import Button from '../Button/Button';
import { firestore, functions } from '../../firebase/init';

const RenderFavorite = ({ user, image }: any) => {
  const [disabled, setDisabled] = React.useState(false);
  const [alreadyFaved, setAlreadyFaved] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);

  useEffect(() => {
    if (
      !image?.docId ||
      user?.collections == null ||
      user?.collections?.length === 0
    )
      return;

    // Check if user had favorites collection
    const favoritesCollection = user?.collections.filter(
      (e: { name: string }) => e.name === 'Favorites'
    )[0];
    if (favoritesCollection.length === 0) return;

    // Check if current image is already favored by user
    if (favoritesCollection.images?.includes(image?.docId)) {
      setAlreadyFaved(true);
    }
    setFavorites(favoritesCollection.images || []);
  }, [user, image]);

  const updateFavoriteCounter = functions.httpsCallable(
    'updateFavoriteCounter'
  );

  const handleClick = async () => {
    const docId = image?.docId || '';

    if (docId === '') return;

    setDisabled(true);
    try {
      let newFavorites: string[] = favorites || [];

      if (!alreadyFaved) {
        // Adding to favorites
        if (!newFavorites.includes(docId)) newFavorites.push(docId);
      } else {
        // Removing from favorites
        newFavorites = newFavorites.filter((e) => e !== docId);
      }

      const favoritesCollection = user?.collections?.filter(
        (e: { name: string }) => e.name === 'Favorites'
      )[0];

      await firestore
        .collection('users')
        .doc(user?.uid)
        .collection('collections')
        .doc(favoritesCollection.docId || '')
        .update({
          images: newFavorites,
        });

      // Update favorites counter
      updateFavoriteCounter({ increment: !alreadyFaved, docId }).catch();

      setAlreadyFaved(!alreadyFaved);
    } catch (error) {
      console.error(error);
    }

    setDisabled(false);
  };

  return (
    <Button
      variant='outlined'
      disabled={disabled}
      onClick={handleClick}
      startIcon={alreadyFaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    >
      {alreadyFaved ? 'Remove from Favorites' : 'Favorite'}
    </Button>
  );
};

export default RenderFavorite;
