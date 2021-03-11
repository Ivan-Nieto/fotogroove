import { useState, useEffect } from 'react';
import { auth } from '../../firebase/init';

import { useFormContext } from '../Context';

const useSyncAuth = () => {
  const [user, setUser]: any = useState(undefined);
  const { dispatch } = useFormContext();

  useEffect(() => {
    auth.onAuthStateChanged((usr) => {
      if (usr) {
        // User is signed in.
        setUser(usr);
        dispatch({ type: 'SIGN_IN', value: usr });
      } else {
        // No user is signed in.
        setUser(false);
        dispatch({ type: 'SIGN_OUT', value: {} });
      }
    });
  }, [setUser, dispatch]);

  return user;
};

export default useSyncAuth;
