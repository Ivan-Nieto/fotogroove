import { useState, useEffect } from 'react';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';
import { auth } from '../../firebase/init';
import { User } from '../initialValues';
import { useFormContext } from '../Context';

const useSyncAuth = () => {
  const [user, setUser]: any = useState(User);
  const { dispatch } = useFormContext();

  useEffect(() => {
    let mounted = true;
    const authChange$ = new Subject<firebase.User | null>();
    const fbUnsubscribe = auth.onAuthStateChanged(authChange$);
    authChange$.subscribe((usr) => {
      if (usr && mounted) {
        // User is signed in.
        setUser(usr);
        dispatch({ type: 'SIGN_IN', value: usr });
      } else if (mounted) {
        // No user is signed in.
        setUser(false);
        dispatch({ type: 'SIGN_OUT', value: User });
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
