import React from 'react';

import useScroll from '../../hooks/useScroll';
import usePaginate from '../../hooks/usePagination';

import { firestore } from '../../firebase/init';
import { getDownloadUrls } from '../../firebase/firestore/firestore';
import RenderImageGallery from '../../components/RenderImageGallery/RenderImageGallery';

const RenderWelcomePage = ({ activeFilter }: { activeFilter: number }) => {
  const bottomHit = useScroll();
  const dbRefs = [
    firestore.collection('images').where('visibility', '==', 'PUBLIC').orderBy('rating', 'desc').orderBy('createDate', 'desc'),
    firestore.collection('images').where('visibility', '==', 'PUBLIC').orderBy('views', 'desc').orderBy('createDate', 'desc'),
    firestore.collection('images').where('visibility', '==', 'PUBLIC').orderBy('favorites', 'desc').orderBy('createDate', 'desc'),
  ];
  const [images, , loading, setChangeQuery] = usePaginate(bottomHit, dbRefs[0], ['rating', 'createDate'], 15, getDownloadUrls, true);

  React.useEffect(() => {
    if (activeFilter === -1) return;
    setChangeQuery(dbRefs[activeFilter]);
    // eslint-disable-next-line
  }, [activeFilter]);

  return <RenderImageGallery images={images} onEmptyMessage={loading ? 'Loading...' : 'Nothing found :/'} />;
};

export default RenderWelcomePage;
