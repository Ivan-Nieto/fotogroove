import { useState, useEffect } from 'react';
import firebase from 'firebase/app';

const usePagination = (
  paginate: any,
  query: firebase.firestore.Query<firebase.firestore.DocumentData>,
  orderByFields: string[],
  batchSize?: number,
  mutateResults?: (
    docs: firebase.firestore.QueryDocumentSnapshot[]
  ) => Array<any>
) => {
  const [data, setData]: any = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [paginating, setPaginating] = useState(false);
  const [lastEntry, setLastEntry]: [Record<string, any>, any] = useState({});
  const limit = batchSize || 15;

  const [snapshotCount, setSnapshotCount] = useState(0);
  const [snapshotSet, setSnapshotSet] = useState(false);

  useEffect(() => {
    if (!snapshotSet) return;

    const firstRecord = data[0];
    let obj: Record<string, any> = {};
    orderByFields.forEach((e) => {
      obj[e] = firstRecord[e];
    });

    const unsubscribe = query
      .limit(limit)
      .endBefore(...orderByFields.map((e) => obj[e]))
      .onSnapshot((querySnapshot) => {
        const newDocs = mutateResults
          ? mutateResults(querySnapshot.docs)
          : querySnapshot.docs;
        // Snapshot hit
        setData(newDocs.concat(data));
        if (snapshotCount + querySnapshot.size > limit) {
          unsubscribe();
        } else setSnapshotCount(snapshotCount + querySnapshot.size);
      });

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, [snapshotSet]);

  useEffect(() => {
    let mounted = true;
    const dbRef = query.limit(limit);

    const getData = async () => {
      let newData;
      setPaginating(true);

      const lastEntryEmpty = Object.keys(lastEntry).length === 0;

      if (!lastEntryEmpty) {
        newData = await dbRef
          .startAfter(...orderByFields.map((e) => lastEntry[e]))
          .get();
      } else {
        newData = await dbRef.get();
      }

      if (!mounted) return;

      if (mutateResults) {
        setData(data.concat(mutateResults(newData.docs || [])));
      } else setData(data.concat(newData?.docs || []));

      if (!snapshotSet && !newData.empty) setSnapshotSet(true);

      // Find out if bottom has been reached
      if (newData.empty || newData.size < limit) {
        setEndReached(true);
        setPaginating(false);
        return;
      }

      // Get data from last doc in array
      const lastDocData = newData.docs[newData.docs.length - 1].data() || {};
      let obj: Record<string, any> = {};
      orderByFields.forEach((e) => {
        obj[e] = lastDocData[e];
      });

      // Set last reading if necessary
      setLastEntry(obj);

      setPaginating(false);
    };

    if (!paginating && !endReached) {
      try {
        getData();
      } catch (error) {
        console.error(error);
      }
    }

    return () => {
      mounted = false;
    };

    // eslint-disable-next-line
  }, [paginate]);

  return [data, snapshotCount === limit];
};

export default usePagination;
