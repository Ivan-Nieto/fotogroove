import { useEffect, useRef } from 'react';
import cuid from 'cuid';
import { useNotifyContext, Dispatch } from '../notificationsContext/Context';
import useUser from './useUser';

const useTutorial = () => {
  const user = useUser();
  const { dispatch }: { dispatch: Dispatch } = useNotifyContext();
  const ref = useRef<any>();

  useEffect(() => {
    if (!window.localStorage) return;

    const setItem = (item: string) => window.localStorage.setItem(item, 'true');

    const welcome = Boolean(window?.localStorage?.getItem('fotogroove-tips-welcome'));
    const upload = Boolean(window?.localStorage?.getItem('fotogroove-tips-upload'));

    if (!Boolean(welcome)) {
      ref.current = setTimeout(() => {
        setItem('fotogroove-tips-welcome');
        dispatch({
          type: 'ADD_NOTIFICATION',
          value: {
            id: cuid(),
            severity: 'info',
            content: 'Welcome to Fotogroove!',
          },
        });
      }, 2000);
    }

    if (Boolean(upload) && user?.isSignedIn) {
      ref.current = setTimeout(() => {
        setItem('fotogroove-tips-upload');
        dispatch({
          type: 'ADD_NOTIFICATION',
          value: {
            id: cuid(),
            severity: 'info',
            duration: 7000,
            content: 'You can start uploading your own images by going to Upload in the profile drop down.',
          },
        });
      }, 3500);
    }

    return () => {
      if (ref.current) clearTimeout(ref.current);
    };

    // eslint-disable-next-line
  }, [user]);
};

export default useTutorial;
