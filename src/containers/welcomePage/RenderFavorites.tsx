import React from 'react';

import useScroll from '../../hooks/useScroll';
import usePaginate from '../../hooks/usePagination';

import { firestore } from '../../firebase/init';
import { getDownloadUrls } from '../../firebase/firestore/firestore';
import RenderImageGallery from '../../components/RenderImageGallery/RenderImageGallery';

const RenderFavorites = () => {
  const bottomHit = useScroll();
  const dbRef = firestore
    .collection('images')
    .where('visibility', '==', 'PUBLIC')
    .orderBy('favorites', 'desc')
    .orderBy('createDate', 'desc');

  const [images] = usePaginate(
    bottomHit,
    dbRef,
    ['favorites', 'createDate'],
    15,
    getDownloadUrls,
    true
  );

  return <RenderImageGallery images={images} onEmptyMessage={''} />;
};

export default RenderFavorites;
