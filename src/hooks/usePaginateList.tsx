import { useState, useEffect } from 'react';
import { getImagesFromList } from '../firebase/firestore/firestore';

const usePaginateList = (paginate: any, images: string[], batchSize?: number) => {
  const [data, setData]: any = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [paginating, setPaginating] = useState(false);
  const [head, setHead] = useState(0);
  const limit = batchSize || 15;

  useEffect(() => {
    let mounted = true;

    if (!images || images.length === 0 || !mounted || endReached) return;

    const getImgs = async () => {
      setPaginating(true);
      const nextBatch = images.slice(head, head + limit - 1);

      const response = await getImagesFromList(nextBatch);

      if (response.error || !mounted || response.images.length === 0) return;

      setData(data.concat(response.images));
      if (head + limit === images.length) setEndReached(true);
      setHead(head + limit - 1);
      setPaginating(false);
    };

    getImgs();
    return () => {
      mounted = false;
    };

    // eslint-disable-next-line
  }, [paginate, images]);

  return [data, endReached, paginating];
};

export default usePaginateList;
