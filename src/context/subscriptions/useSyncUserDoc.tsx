import { useEffect } from 'react';
import { Subject, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import _ from 'lodash';

import useUser from '../../hooks/useUser';

import { firestore } from '../../firebase/init';
import { useFormContext } from '../Context';
import useSync from './useSync';

const accessUserDb = (obs$: Observer<firebase.firestore.DocumentData>, uid: string) => firestore.collection('users').doc(uid).onSnapshot(obs$);

const getUserData = (userDoc: firebase.firestore.DocumentData) => (userDoc.exists ? { ...userDoc.data() } : {});

const useSyncUserDoc = () => {
  const user = useUser();
  const { dispatch, state } = useFormContext();
  const done = useSync('userDoc');

  useEffect(() => {
    if (!user.isSignedIn || Object.keys(user?.userDoc || {}).length !== 0) {
      done();
      return;
    }
    const userData$ = new Subject<firebase.firestore.DocumentData>();
    const unsubscribe = accessUserDb(userData$, user?.uid);

    userData$.pipe(map(getUserData)).subscribe(
      (data) => {
        if (!_.isEqual(state?.user, data) && data && Object.keys(data).length !== 0) dispatch({ type: 'UPDATE_USER', value: data });
        done();
      },
      () => {
        done();
      }
    );

    return () => {
      unsubscribe();
      userData$.unsubscribe();
    };

    // eslint-disable-next-line
  }, [user, dispatch]);
};

export default useSyncUserDoc;
