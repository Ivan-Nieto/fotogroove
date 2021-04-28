import React from 'react';
import MaterialModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      outlineColor: '#141e30',
    },
    paper: {
      backgroundColor: 'rgba(37, 40, 43, 0.8)',
      borderRadius: '10px',
      backdropFilter: 'blur(5px)',
    },
    noOutline: {
      outline: 0,
    },
  })
);

interface Modal {
  children?: any;
  open: boolean;
  setOpen: () => void | undefined;
}

const Modal = ({ children, open, setOpen }: any) => {
  const classes = useStyles();

  const style = useSpring({
    outline: 0,

    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
  });

  return (
    <MaterialModal
      className={classes.modal}
      open={open}
      onClose={() => setOpen(!open)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <animated.div style={style} className={classes.noOutline}>
        <div className={classes.paper}>{children}</div>
      </animated.div>
    </MaterialModal>
  );
};

export default Modal;
