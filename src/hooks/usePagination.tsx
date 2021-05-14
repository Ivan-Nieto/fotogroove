import { useState, useEffect } from 'react';
import firebase from 'firebase/app';

const usePagination = (
  paginate: any,
  searchQuery: firebase.firestore.Query<firebase.firestore.DocumentData>,
  orderByFields: string[],
  batchSize?: number,
  mutateResults?: (docs: firebase.firestore.QueryDocumentSnapshot[]) => Array<any> | Promise<Array<any>>,
  dontAddNew?: boolean
) => {
  const [data, setData]: any = useState([]);
  const [reQuery, setReQuery] = useState(0);
  const [query, setQuery] = useState(searchQuery);
  const [changeQuery, setChangeQuery] = useState<firebase.firestore.Query<firebase.firestore.DocumentData>>();
  const [endReached, setEndReached] = useState(false);
  const [paginating, setPaginating] = useState(false);
  const [lastEntry, setLastEntry]: [Record<string, any>, any] = useState({});
  const limit = batchSize || 15;

  const [snapshotCount, setSnapshotCount] = useState(0);
  const [snapshotSet, setSnapshotSet] = useState(false);

  // Control query restart
  useEffect(() => {
    if (!changeQuery) return;

    // Reset all values to their defaults;
    setEndReached(false);
    setLastEntry({});
    setData([]);
    setSnapshotCount(0);
    setSnapshotSet(false);
    setQuery(changeQuery);
    setReQuery(Math.random());
  }, [changeQuery]);

  useEffect(() => {
    if (!snapshotSet || dontAddNew) return;

    const firstRecord = data[0];
    let obj: Record<string, any> = {};
    orderByFields.forEach((e) => {
      obj[e] = firstRecord[e];
    });

    const unsubscribe = query
      .limit(limit)
      .endBefore(...orderByFields.map((e) => obj[e]))
      .onSnapshot(async (querySnapshot) => {
        const newDocs = mutateResults ? await mutateResults(querySnapshot.docs) : querySnapshot.docs;
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
        newData = await dbRef.startAfter(...orderByFields.map((e) => lastEntry[e])).get();
      } else {
        newData = await dbRef.get();
      }

      if (!mounted) return;

      if (mutateResults) {
        const muData = await mutateResults(newData.docs || []);
        if (!mounted) return;
        setData(data.concat(muData || []));
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
  }, [paginate, reQuery]);

  return [data, snapshotCount === limit, paginating, setChangeQuery];
};

export default usePagination;
