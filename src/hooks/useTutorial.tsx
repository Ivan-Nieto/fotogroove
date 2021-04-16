import { useEffect, useRef } from 'react';
import cuid from 'cuid';
import { useNotifyContext } from '../notificationsContext/Context';

const useTutorial = () => {
  const { dispatch } = useNotifyContext();
  const ref = useRef<any>();

  useEffect(() => {
    if (!window.localStorage) return;

    const welcome = Boolean(window?.localStorage?.getItem('fotogroove-tips-welcome'));

    if (!Boolean(welcome)) {
      ref.current = setTimeout(() => {
        window.localStorage.setItem('fotogroove-tips-welcome', 'true');
        dispatch({
          type: 'ADD_NOTIFICATION',
          value: {
            id: cuid(),
            severity: 'info',
            content: 'Welcome to Fotogroove!',
          },
        });
      }, 3000);
    }

    return () => {
      if (ref.current) clearTimeout(ref.current);
    };

    // eslint-disable-next-line
  }, []);
};

export default useTutorial;
