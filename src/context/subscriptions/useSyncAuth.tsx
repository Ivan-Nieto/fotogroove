import { useState, useEffect } from 'react';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';
import { auth } from '../../firebase/init';
import { user as userInitialState } from '../initialValues';
import { useFormContext } from '../Context';
import _ from 'lodash';

import useSync from './useSync';

const useSyncAuth = () => {
  const [user, setUser]: any = useState(userInitialState);
  const { dispatch, state } = useFormContext();
  const done = useSync('auth');

  useEffect(() => {
    let mounted = true;
    const authChange$ = new Subject<firebase.User | null>();
    const fbUnsubscribe = auth.onAuthStateChanged(authChange$);
    authChange$.subscribe((usr) => {
      done();
      if (usr && mounted) {
        // User is signed in.
        setUser(usr);
        if (!_.isEqual(state?.user, usr)) dispatch({ type: 'SIGN_IN', value: usr });
      } else if (mounted) {
        // No user is signed in.
        setUser(false);
        if (!_.isEqual(state?.user, usr)) dispatch({ type: 'SIGN_OUT', value: userInitialState });
      }
    });

    return () => {
      authChange$.unsubscribe();
      fbUnsubscribe();
      mounted = false;
    };
    // eslint-disable-next-line
  }, [setUser, dispatch]);

  return user;
};

export default useSyncAuth;
