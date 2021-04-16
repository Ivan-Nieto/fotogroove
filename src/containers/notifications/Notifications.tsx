import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Notification } from '../../notificationsContext/initialValues';
import { useNotifyContext } from '../../notificationsContext/Context';
import NotificationAlert from './NotificationAlert';
import useTutorial from '../../hooks/useTutorial';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    zIndex: 1000,
    width: '0 auto',
    top: 'unset',
    bottom: '30px',
    margin: '0 auto',
    left: '30px',
    right: '30px',
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none',
    alignItems: 'flex-end',
  },
}));

const Notifications = () => {
  const { state } = useNotifyContext();
  const [notifications, setNotifications]: [Array<Notification>, any] = useState([]);
  const classes = useStyles();
  useTutorial();

  useEffect(() => {
    setNotifications(state?.notifications);
  }, [state]);

  return (
    <div className={classes.root}>
      {notifications
        .filter((a, index) => index < 10)
        .map((e: Notification) => (
          <NotificationAlert key={e.id} {...{ ...e }} />
        ))}
    </div>
  );
};

export default Notifications;
