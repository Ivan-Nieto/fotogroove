import { useEffect } from 'react';
import { Subject, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

import useUser from '../../hooks/useUser';

import { firestore } from '../../firebase/init';
import { useFormContext } from '../Context';

const accessUserDb = (
  obs$: Observer<firebase.firestore.DocumentData>,
  uid: string
) => firestore.collection('users').doc(uid).onSnapshot(obs$);

const getUserData = (userDoc: firebase.firestore.DocumentData) =>
  userDoc.exists ? { ...userDoc.data() } : {};

const useSyncUserDoc = () => {
  const user = useUser();
  const { dispatch } = useFormContext();

  useEffect(() => {
    if (!user.isSignedIn || Object.keys(user?.userDoc || {}).length !== 0)
      return;
    const userData$ = new Subject<firebase.firestore.DocumentData>();
    const unsubscribe = accessUserDb(userData$, user?.uid);

    userData$.pipe(map(getUserData)).subscribe(
      (data) => {
        dispatch({ type: 'UPDATE_USER', value: data });
      },
      () => {}
    );

    return () => {
      unsubscribe();
      userData$.unsubscribe();
    };
  }, [user, dispatch]);
};

export default useSyncUserDoc;
