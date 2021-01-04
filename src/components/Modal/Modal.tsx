import React from "react";
import MaterialModal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import { useSpring, animated } from "react-spring"; // web.cjs is required for IE 11 support

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      backgroundColor: theme.palette.grey[100],
      borderRadius: "10px",
      padding: "20px",
    },
  })
);

const Fade = React.forwardRef<HTMLDivElement, any>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const Modal = ({ children, show, handleClose }: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <MaterialModal
      aria-labelledby="spring-modal-title"
      aria-describedby="spring-modal-description"
      className={classes.modal}
      open={show}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={show}>
        <div className={classes.modal}>{children}</div>
      </Fade>
    </MaterialModal>
  );
};

export default Modal;
