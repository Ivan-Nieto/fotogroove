import { useEffect } from 'react';

import { firestore } from '../../firebase/init';
import { useFormContext } from '../Context';
import useSync from './useSync';

const useSyncTags = () => {
  const { dispatch } = useFormContext();
  const done = useSync('tags');

  useEffect(() => {
    let mounted = true;
    const getTags = async () => {
      try {
        const snapshot = await firestore.collection('stats').doc('tags').get();

        if (!snapshot.exists) return;

        // Create array from object
        const tags: { label: string; count: number }[] = [];

        const data = snapshot.data() || {};

        // Sort keys alphabetically
        const ordered = Object.keys(data)
          .sort()
          .reduce((obj: Record<string, any>, key: string) => {
            obj[key] = data[key];
            return obj;
          }, {});

        Object.keys(ordered).forEach((e) => {
          tags.push({ label: e, count: data[e] });
        });

        if (mounted) {
          dispatch({ type: 'UPDATE_TAGS', value: tags });
          done();
        }
      } catch (error) {}
    };

    getTags();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line
  }, [dispatch]);
};

export default useSyncTags;
