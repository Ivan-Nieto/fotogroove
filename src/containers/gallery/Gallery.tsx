import React, { useEffect, useState } from 'react';

import useQuery from '../../hooks/useQuery';
import useUser from '../../hooks/useUser';
import useScroll from '../../hooks/useScroll';

import { getUsersImages } from '../../firebase/firestore/firestore';
import RenderImageGallery from '../../components/RenderImageGallery/RenderImageGallery';

const Gallery = ({ targetAccount }: { targetAccount?: string }) => {
  const query = useQuery();
  const user = useUser();
  const bottomHit = useScroll();

  const [images, setImages]: any = useState(false);
  const [account, setAccount] = useState('');
  const [lastEntry, setLastEntry]: any = useState(false);
  const [paginating, setPaginating] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [targetIsUser, setTargetIsUser] = useState(false);

  // Paginate
  useEffect(() => {
    let mounted = true;
    const update = async () => {
      if (bottomHit !== 0 && !paginating && !endReached && mounted) {
        setPaginating(true);
        // Get new set of images
        const newImgs = await getUsersImages(account, lastEntry);

        if (!mounted) return;

        // Add new images to current set
        const newImages = (images || []).concat(newImgs.images || []);
        setImages(newImages);

        // Decide weather or not this is the end of the list
        const newLastEntry = newImgs.images ? newImgs.images[newImgs?.images?.length - 1] : false;
        if (lastEntry && (!newLastEntry || newLastEntry.id === lastEntry.id)) {
          setEndReached(true);
        } else setLastEntry(newLastEntry);

        setPaginating(false);
      }
    };

    update();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomHit]);

  // Initial Query
  useEffect(() => {
    let mounted = true;

    const getImages = async () => {
      setPaginating(true);
      const images = await getUsersImages(account);
      if (mounted) {
        setImages(images?.images || []);
        if (images?.images) setLastEntry(images?.images[images?.images?.length - 1]);
        setPaginating(false);
      }
    };
    if (account !== '' && !paginating) getImages();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line
  }, [account]);

  // Find out target account
  useEffect(() => {
    // If account was already set abort
    if (account !== '') return;

    // Get images from appropriate account
    const urlParam = query.get('user');
    // From url parameter
    if (urlParam) setAccount(urlParam);
    // From prop
    else if (targetAccount) setAccount(targetAccount);
    // From current signed in account
    else if (user?.isSignedIn) {
      setTargetIsUser(true);
      setAccount(user?.uid || '');
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <RenderImageGallery
      images={images}
      onEmptyMessage={
        targetIsUser
          ? `You haven't uploaded any images yet. You can upload your images by selecting "Upload" from the profile dropdown. Any images you upload will show up here.`
          : `This user hasn't uploaded any images.`
      }
    />
  );
};

export default Gallery;
