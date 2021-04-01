import React from 'react';

import useScroll from '../../hooks/useScroll';
import usePaginate from '../../hooks/usePagination';
import useQuery from '../../hooks/useQuery';

import { firestore } from '../../firebase/init';
import { getDownloadUrls } from '../../firebase/firestore/firestore';
import RenderImageGallery from '../../components/RenderImageGallery/RenderImageGallery';

const ViewByTag = () => {
  const bottomHit = useScroll();
  const query = useQuery();
  const dbRef = firestore
    .collection('images')
    .where('visibility', '==', 'PUBLIC')
    .where('tags', 'array-contains', query.get('tag'))
    .orderBy('createDate', 'desc');

  const [images] = usePaginate(
    bottomHit,
    dbRef,
    ['createDate'],
    15,
    getDownloadUrls,
    true
  );

  return (
    <RenderImageGallery images={images} onEmptyMessage={'Nothing found'} />
  );
};

export default ViewByTag;
