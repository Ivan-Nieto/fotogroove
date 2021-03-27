import React from 'react';

import useScroll from '../../hooks/useScroll';
import usePaginate from '../../hooks/usePagination';

import { firestore } from '../../firebase/init';
import { getDownloadUrls } from '../../firebase/firestore/firestore';
import RenderImageGallery from '../../components/RenderImageGallery/RenderImageGallery';

const RenderLatest = () => {
  const bottomHit = useScroll();
  const dbRef = firestore
    .collection('images')
    .where('visibility', '==', 'PUBLIC')
    .orderBy('rating', 'desc')
    .orderBy('createDate', 'desc');

  const [images] = usePaginate(
    bottomHit,
    dbRef,
    ['rating', 'createDate'],
    15,
    getDownloadUrls,
    true
  );

  return <RenderImageGallery images={images} onEmptyMessage={''} />;
};

export default RenderLatest;
