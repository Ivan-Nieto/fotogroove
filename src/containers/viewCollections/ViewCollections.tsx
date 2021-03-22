import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import useUser from '../../hooks/useUser';

import { getImagesFromList } from '../../firebase/firestore/firestore';
import RenderCollectionButtons from './RenderCollectionButtons';
import RenderImageGallery from '../../components/RenderImageGallery/RenderImageGallery';

const useStyles = makeStyles(() => ({
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
  const classes = useStyles();
  const [collections, setCollections]: any = useState([]);
  const [activeCollection, setActiveCollection] = useState(0);
  const [loading, setLoading] = useState(false);

  const [images, setImages]: any = useState(false);
  const [lastEntry, setLastEntry]: any = useState(false);
  const [paginating, setPaginating] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [reRunPagination, setReRunPagination] = useState(0);

  const user = useUser();

  const updateActiveCollection = (index: number) => {
    if (paginating || loading) return;
    setActiveCollection(index);
    setImages([]);
    setLastEntry(false);
    setEndReached(false);
    setReRunPagination(Math.random());
  };

  // Get user collections
  useEffect(() => {
    let mounted = true;
    const getCols = async () => {
      setLoading(true);
      const newCollections =
        user?.collections?.map((e: Record<string, any>, index: number) => ({
          ...e,
          onClick: () => updateActiveCollection(index),
        })) || [];

      setCollections(newCollections || []);

      if (!newCollections || newCollections.length === 0) return;

      setPaginating(true);
      const images = await getImagesFromList(newCollections[0].images || []);
      if (mounted) {
        setImages(images?.images || []);
        if (images?.images)
          setLastEntry(images?.images[images?.images?.length - 1]);
        setPaginating(false);
      }

      if (mounted) setLoading(false);
    };

    if (user?.isSignedIn && !loading && !paginating) getCols();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line
  }, [user]);

  // Paginate
  useEffect(() => {
    let mounted = true;
    const update = async () => {
      if (!loading && !paginating && !endReached && mounted) {
        setPaginating(true);
        // Get new set of images
        const newImgs = await getImagesFromList(
          collections[activeCollection].images,
          lastEntry
        );

        if (!mounted) return;

        // Add new images to current set
        const newImages = (images || []).concat(newImgs.images || []);
        setImages(newImages);

        // Decide weather or not this is the end of the list
        const newLastEntry = newImgs.images
          ? newImgs.images[newImgs?.images?.length - 1]
          : false;
        if (lastEntry && (!newLastEntry || newLastEntry.id === lastEntry.id)) {
          setEndReached(true);
        } else setLastEntry(newLastEntry);

        setPaginating(false);
      }
    };

    if (
      collections[activeCollection] &&
      collections[activeCollection].images?.length > 0
    )
      update();
    else {
      setImages([]);
      setEndReached(true);
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRunPagination]);

  const addCollection = (newCol: string) => {
    setCollections(
      collections.concat([
        {
          name: newCol,
          images: [],
          docId: '',
          onCLick: () => updateActiveCollection(collections.length),
        },
      ])
    );
  };

  return (
    <div className={classes.root}>
      {collections.length > 0 && (
        <RenderCollectionButtons
          activeCollection={activeCollection}
          addCollection={addCollection}
          uid={user.uid}
          collections={collections}
        />
      )}
      {!loading && (
        <RenderImageGallery
          images={images}
          onEmptyMessage={
            paginating ? 'Loading...' : 'This collection is empty'
          }
        />
      )}
    </div>
  );
};

export default ViewCollections;
