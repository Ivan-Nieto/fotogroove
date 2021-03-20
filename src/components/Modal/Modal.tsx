import React from 'react';
import MaterialModal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import { useSpring, animated } from 'react-spring'; // web.cjs is required for IE 11 support

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      outline: 'none',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.grey[100],
      borderRadius: '10px',
      outline: 'none',
    },
  })
);

const Modal = ({ children, open, setOpen }: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const style = useSpring({
    outline: 'none',
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
      <animated.div style={style}>
        <div className={classes.paper}>{children}</div>
      </animated.div>
    </MaterialModal>
  );
};

export default Modal;
