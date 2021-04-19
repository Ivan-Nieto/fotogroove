import React, { useEffect } from 'react';

import useScroll from '../../hooks/useScroll';
import usePaginate from '../../hooks/usePagination';
import useQuery from '../../hooks/useQuery';

import { firestore } from '../../firebase/init';
import { getDownloadUrls } from '../../firebase/firestore/firestore';
import RenderImageGallery from '../../components/RenderImageGallery/RenderImageGallery';

const ViewByTag = () => {
  const bottomHit = useScroll();
  const query = useQuery();
  const [fr, setFr] = React.useState(true);
  const tag = query.get('tag') as string;

  const makeQuery = (t: string) =>
    firestore.collection('images').where('visibility', '==', 'PUBLIC').where('tags', 'array-contains', t).orderBy('createDate', 'desc');

  const [images, , loading, changeTag] = usePaginate(bottomHit, makeQuery(tag), ['createDate'], 15, getDownloadUrls, true);

  useEffect(() => {
    if (fr) {
      setFr(false);
      return;
    }

    changeTag(makeQuery(tag));
    // eslint-disable-next-line
  }, [tag]);

  return <RenderImageGallery images={images} onEmptyMessage={loading ? 'Loading...' : 'Nothing found'} />;
};

export default ViewByTag;
