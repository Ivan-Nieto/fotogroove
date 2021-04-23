import React from 'react';
import { useSpring, animated as a } from 'react-spring';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '0px',
    display: 'block',
    willChange: 'transform',
  },
}));

const Zoom = ({ children, className }: any) => {
  const { root } = useStyles();
  const trans = (x: any, y: any, s: any) => `scale(${s})`;
  const [props, setProps] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 1, tension: 210, friction: 20 } }));

  const mouseOver = () => {
    setProps({ xys: [0, 0, 1.01] });
  };
  const mouseLeave = () => {
    setProps({ xys: [0, 0, 1] });
  };

  return (
    <a.div
      // @ts-ignore
      style={{ transform: props?.xys?.interpolate(trans) }}
      onMouseMove={mouseOver}
      onMouseLeave={mouseLeave}
      className={`${className || ''} ${root}`}
    >
      {children}
    </a.div>
  );
};

export default Zoom;
