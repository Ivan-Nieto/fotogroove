import React, { useEffect, useState } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import useUser from '../../hooks/useUser';

import Gallery from '../gallery/Gallery';
import { getCollections } from '../../firebase/firestore/collections';
import { getImagesFromList } from '../../firebase/firestore/firestore';

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
}));

const ViewCollections = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [loading, setLoading] = useState(true);
  const [collections, setCollections]: any = useState([]);
  const user = useUser();
  const index = 0;

  // Get user collections
  useEffect(() => {
    let mounted = true;

    const getCols = async () => {
      const response = await getCollections(user.uid);
      if (!mounted) return;

      setCollections(response.collections || []);

      if (!response.empty && !response.error) setLoading(false);
    };

    if (user?.isSignedIn) getCols();

    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <div className={classes.root}>
      {!loading && (
        <Gallery
          imageSource={() =>
            getImagesFromList(
              collections.length > 0 && collections[index]
                ? collections[index].images
                : ['']
            )
          }
        />
      )}
    </div>
  );
};

export default ViewCollections;
