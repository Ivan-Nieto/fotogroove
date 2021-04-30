import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSpring, animated as a } from 'react-spring';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import { useNotifyContext } from '../../notificationsContext/Context';
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
  const { dispatch } = useNotifyContext();
  const [close, setClose] = useState(false);
  const ref = useRef<any>();
  const refInterval = useRef<any>();
  const [springProps, setSpringProps] = useSpring(() => ({
    from: { opacity: 0, transform: 'translate3d(80px,0,0)' },
    to: { opacity: 1, transform: 'translate3d(0px,0,0)' },
  }));

  useEffect(() => {
    let mounted = true;

    const exitAnimationProps = {
      from: { opacity: 1, transform: 'translate3d(0px,0,0)' },
      to: { opacity: 0, transform: 'translate3d(80px,0,0)' },
      onRest: () => {
        // Remove notification
        dispatch({ type: 'REMOVE_NOTIFICATION', value: props.id });
      },
    };

    if (close) {
      if (ref.current || !mounted) clearTimeout(ref.current);
      if (mounted) {
        setSpringProps(exitAnimationProps);
      }
    } else {
      ref.current = setTimeout(() => {
        if (mounted) {
          setSpringProps(exitAnimationProps);
        }
      }, props.duration || 4000);

      const elm = document.getElementById(`notification-loading-bar-${props.id}`);
      let width = 2;
      refInterval.current = setInterval(() => {
        if (width >= 100) {
          clearInterval(refInterval.current);
        } else {
          if (elm?.style) elm.style.width = `${width}%`;
          width += 1;
        }
      }, (props.duration || 4000) / 100);
    }

    return () => {
      mounted = false;
      if (refInterval.current) clearInterval(refInterval.current);
      if (ref.current) clearTimeout(ref.current);
    };

    // eslint-disable-next-line
  }, [close]);

  const defaultAction = (
    <IconButton size='small' onClick={() => setClose(true)} color='inherit'>
      <CloseIcon color='inherit' />
    </IconButton>
  );

  return (
    <a.div style={springProps} className={classes.root}>
      <Alert
        {...{
          action: props.action || defaultAction,
          onClose: props.onClose,
          icon: props.icon,
          closeText: props.closeText,
          severity: props.severity,
          key: props.id,
          className: classes.card,
        }}
      >
        {props.title && <AlertTitle>{props.title}</AlertTitle>}

        {props.content}
        <div id={`notification-loading-bar-${props.id}`} className={classes.loadingBar} />
      </Alert>
    </a.div>
  );
};

export default NotificationAlert;
