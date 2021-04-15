import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import { Notification } from '../../notificationsContext/initialValues';
import { useNotifyContext } from '../../notificationsContext/Context';

const useStyles = makeStyles(() => ({
  card: {
    width: '300px',
    minHeight: '50px',
    borderRadius: '7px',
    padding: '10px',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: '20px',
  },
}));

const NotificationAlert = (props: Notification) => {
  const { dispatch } = useNotifyContext();
  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => {
      if (mounted) dispatch({ type: 'REMOVE_NOTIFICATION', value: props.id });
    }, props.duration || 4000);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <Alert
      {...{ action: props.action, onClose: props.onClose, icon: props.icon, closeText: props.closeText }}
      className={classes.card}
      severity={props.severity}
      key={props.id}
    >
      {props.title && <AlertTitle>{props.title}</AlertTitle>}

      {props.content}
    </Alert>
  );
};

export default NotificationAlert;
