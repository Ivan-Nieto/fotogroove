import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import { Notification } from '../../notificationsContext/initialValues';
import { useNotifyContext } from '../../notificationsContext/Context';
import NotificationAlert from './NotificationAlert';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    zIndex: 1000,
    width: '0 auto',
    top: (props: any) => (props.top ? '30px' : 'unset'),
    bottom: (props: any) => (props.top ? 'unset' : '30px'),
    margin: '0 auto',
    left: '30px',
    right: '30px',
    display: 'flex',
    flexDirection: (props: any) => (props.top ? 'column-reverse' : 'column'),
    pointerEvents: 'none',
    alignItems: (props: any) => (props.position === 'center' ? 'center' : `flex-${props.position || 'end'}`),
  },
}));

const Notifications = () => {
  const { state } = useNotifyContext();
  const [notifications, setNotifications]: [Array<Notification>, any] = useState([]);
  const theme = useTheme();
  const classes = useStyles(theme);

  useEffect(() => {
    setNotifications(state?.notifications);
  }, [state]);

  return (
    <div className={classes.root}>
      {notifications.map((e: Notification) => (
        <NotificationAlert key={e.id} {...{ ...e }} />
      ))}
    </div>
  );
};

export default Notifications;
