import { useEffect } from 'react';
import { Subject, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import _ from 'lodash';

import useUser from '../../hooks/useUser';
import useSync from './useSync';

import { firestore } from '../../firebase/init';
import { useFormContext } from '../Context';

const accessUserDb = (obs$: Observer<firebase.firestore.QuerySnapshot>, uid: string) =>
  firestore.collection('users').doc(uid).collection('lists').onSnapshot(obs$);

const getQueryData = (userDoc: firebase.firestore.QuerySnapshot) =>
  !userDoc.empty ? userDoc.docs.filter((e) => Object.keys(e.data() || {}).length > 0).map((e) => ({ ...e.data(), docId: e.id })) : [];

const useSyncUserLists = () => {
  const user = useUser();
  const { dispatch, state } = useFormContext();
  const done = useSync('lists');

  useEffect(() => {
    if (!user.isSignedIn || (user.lists && user.lists?.length !== 0)) {
      done();
      return;
    }

    const userData$ = new Subject<firebase.firestore.QuerySnapshot>();
    const unsubscribe = accessUserDb(userData$, user?.uid);

    userData$.pipe(map(getQueryData)).subscribe((data) => {
      if (!_.isEqual(state?.lists, data) && data && data.length !== 0) dispatch({ type: 'UPDATE_USER_LISTS', value: data });
      done();
    });

    return () => {
      unsubscribe();
      userData$.unsubscribe();
    };
    // eslint-disable-next-line
  }, [user, dispatch]);
};

export default useSyncUserLists;
