import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';

import useQuery from '../../hooks/useQuery';
import useScroll from '../../hooks/useScroll';
import usePaginateList from '../../hooks/usePaginateList';

import RenderImageGallery from '../../components/RenderImageGallery/RenderImageGallery';

const ViewCollection = () => {
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = useQuery();
  const bottomHit = useScroll();
  const [images, , paginating] = usePaginateList(bottomHit, imgs);

  useEffect(() => {
    let mounted = true;

    const account = (query.get('account') as string) || '';
    const collection = (query.get('collection') as string) || '';

    if (!Boolean(account) || !Boolean(collection)) {
      setLoading(false);
      return;
    }

    const getImages = async () => {
      const response: any = await firebase
        .firestore()
        .collection('users')
        .doc(account)
        .collection('collections')
        .doc(collection)
        .get()
        .catch(() => ({ exists: false }));

      if (!response.exists || !mounted) {
        if (mounted) setLoading(false);
        return;
      }

      const docData = response?.data() || {};
      setImgs(docData.images || []);
    };

    getImages();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <RenderImageGallery
        images={images}
        onEmptyMessage={(loading || paginating) && !(!loading && !paginating) ? 'Loading...' : 'This collection is empty'}
      />
    </div>
  );
};

export default ViewCollection;
