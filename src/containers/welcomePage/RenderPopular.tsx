import React from 'react';

import useScroll from '../../hooks/useScroll';
import usePaginate from '../../hooks/usePagination';

import { firestore } from '../../firebase/init';
import { getDownloadUrls } from '../../firebase/firestore/firestore';
import RenderImageGallery from '../../components/RenderImageGallery/RenderImageGallery';

const RenderPopular = () => {
  const bottomHit = useScroll();
  const dbRef = firestore
    .collection('images')
    .where('visibility', '==', 'PUBLIC')
    .orderBy('views', 'desc')
    .orderBy('createDate', 'desc');

  const [images] = usePaginate(
    bottomHit,
    dbRef,
    ['views', 'createDate'],
    15,
    getDownloadUrls,
    true
  );

  return <RenderImageGallery images={images} onEmptyMessage={''} />;
};

export default RenderPopular;
