import { useEffect } from 'react';
import { Subject, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

import useUser from '../../hooks/useUser';
import useSync from './useSync';

import { firestore } from '../../firebase/init';
import { useFormContext } from '../Context';

const accessUserDb = (
  obs$: Observer<firebase.firestore.QuerySnapshot>,
  uid: string
) =>
  firestore
    .collection('users')
    .doc(uid)
    .collection('collections')
    .onSnapshot(obs$);

const getQueryData = (userDoc: firebase.firestore.QuerySnapshot) =>
  !userDoc.empty ? userDoc.docs.map((e) => ({ ...e.data(), docId: e.id })) : [];

const useSyncUserCollections = () => {
  const user = useUser();
  const { dispatch } = useFormContext();
  const done = useSync('collections');

  useEffect(() => {
    if (
      !user.isSignedIn ||
      (user.collections && user.collections?.length !== 0)
    ) {
      done();
      return;
    }

    const userData$ = new Subject<firebase.firestore.QuerySnapshot>();
    const unsubscribe = accessUserDb(userData$, user?.uid);

    userData$.pipe(map(getQueryData)).subscribe((data) => {
      dispatch({ type: 'UPDATE_USER_COLLECTIONS', value: data });
      done();
    });

    return () => {
      unsubscribe();
      userData$.unsubscribe();
    };
    // eslint-disable-next-line
  }, [user, dispatch]);
};

export default useSyncUserCollections;
