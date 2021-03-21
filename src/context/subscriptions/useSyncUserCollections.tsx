import { useEffect } from 'react';
import { Subject, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

import useUser from '../../hooks/useUser';

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

  useEffect(() => {
    if (
      !user.isSignedIn ||
      (user.collections && user.collections?.length !== 0)
    )
      return;

    const userData$ = new Subject<firebase.firestore.QuerySnapshot>();
    const unsubscribe = accessUserDb(userData$, user?.uid);

    userData$.pipe(map(getQueryData)).subscribe((data) => {
      dispatch({ type: 'UPDATE_USER_COLLECTIONS', value: data });
    });

    return () => {
      unsubscribe();
      userData$.unsubscribe();
    };
  }, [user, dispatch]);
};

export default useSyncUserCollections;
