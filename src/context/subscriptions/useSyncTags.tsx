import { useEffect } from 'react';

import { firestore } from '../../firebase/init';
import { useFormContext } from '../Context';

const useSyncTags = () => {
  const { dispatch } = useFormContext();

  useEffect(() => {
    let mounted = true;
    const getTags = async () => {
      try {
        const snapshot = await firestore.collection('stats').doc('tags').get();

        if (!snapshot.exists) return;

        // Create array from object
        const tags: { label: string; count: number }[] = [];

        const data = snapshot.data() || {};
        Object.keys(data).forEach((e) => {
          tags.push({ label: e, count: data[e] });
        });

        if (mounted) dispatch({ type: 'UPDATE_TAGS', value: tags });
      } catch (error) {}
    };

    getTags();
    return () => {
      mounted = false;
    };
  }, [dispatch]);
};

export default useSyncTags;
