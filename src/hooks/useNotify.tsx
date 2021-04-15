import cuid from 'cuid';
import { useEffect, useState } from 'react';
import { useNotifyContext } from '../notificationsContext/Context';
import { Notification } from '../notificationsContext/initialValues';

const useNotify = () => {
  const { dispatch } = useNotifyContext();
  const [notification, setNotification] = useState<Partial<Notification>>();

  useEffect(() => {
    if (notification)
      dispatch({
        type: 'ADD_NOTIFICATION',
        value: { severity: 'info', ...notification, id: cuid() },
      });
  }, [dispatch, notification]);

  return setNotification;
};

export default useNotify;
