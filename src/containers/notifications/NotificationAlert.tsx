import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSpring, animated as a } from 'react-spring';

import { Notification } from '../../notificationsContext/initialValues';

const useStyles = makeStyles(() => ({
  root: {
    willChange: 'transform',
  },
  card: {
    width: '300px',
    minHeight: '50px',
    borderRadius: '7px',
    margin: '0',
    padding: '10px',
    alignItems: 'center',
    alignContent: 'center',
    marginBottom: '20px',
  },
  loadingBar: {
    left: '0',
    bottom: '20px',
    borderRadius: '0px 7px 7px 7px',
    position: 'absolute',
    width: '1%',
    height: '2px',
    paddingTop: '5px',
    backgroundColor: '#243b55',
  },
}));

const NotificationAlert = (props: Notification) => {
  const classes = useStyles();
  const [springProps, setSpringProps] = useSpring(() => ({
    from: { opacity: 0, transform: 'translate3d(80px,0,0)' },
    to: { opacity: 1, transform: 'translate3d(0px,0,0)' },
  }));

  useEffect(() => {
    let mounted = true;
    const timer = setTimeout(() => {
      if (mounted) {
        setSpringProps({
          from: { opacity: 1, transform: 'translate3d(0px,0,0)' },
          to: { opacity: 0, transform: 'translate3d(80px,0,0)' },
        });
      }
    }, props.duration || 4000);

    const elem: any = document.getElementById(`notification-loading-bar-${props.id}`);
    let width = 1;
    const id = setInterval(() => {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width += 1;
        if (elem?.style) elem.style.width = width + '%';
      }
    }, (props.duration || 4000) / 100);

    return () => {
      mounted = false;
      clearInterval(id);
      clearTimeout(timer);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <a.div style={springProps} className={classes.root}>
      <Alert
        {...{ action: props.action, onClose: props.onClose, icon: props.icon, closeText: props.closeText }}
        className={classes.card}
        severity={props.severity}
        key={props.id}
      >
        {props.title && <AlertTitle>{props.title}</AlertTitle>}

        {props.content}
        <div id={`notification-loading-bar-${props.id}`} className={classes.loadingBar} />
      </Alert>
    </a.div>
  );
};

export default NotificationAlert;
