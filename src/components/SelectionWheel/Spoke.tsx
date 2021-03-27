import React from 'react';
import Button from '@material-ui/core/Button';
import { useSpring, animated } from 'react-spring';

interface Params {
  text: string;
  onClick?: () => void | undefined;
  activeOption: number;
  className?: string;
  direction:
    | 'top'
    | 'bottom'
    | 'center'
    | 'reverseTop'
    | 'reverseBottom'
    | 'reverseCenter';
  animate: boolean;
}

const Spoke = ({
  text,
  onClick,
  activeOption,
  className,
  direction,
  animate,
}: Params) => {
  const propsTop = useSpring({
    reset: activeOption > -1,
    from: {
      opacity: 0,
      transform: 'translate3d(0,-100%,0)',
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
    },
  });

  const propsReverseTop = useSpring({
    reset: activeOption > -1,
    from: {
      opacity: 1,
      transform: 'translate3d(0,100%,0)',
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
    },
  });

  const propsCenter = useSpring({
    reset: activeOption > -1,
    from: {
      opacity: 1,
      fontSize: '18',
      transform: 'translate3d(-20px,-100%,0)',
    },
    to: {
      opacity: 1,
      fontSize: '32px',
      transform: 'translate3d(0,0,0)',
    },
  });

  const propsReverseCenter = useSpring({
    reset: activeOption > -1,
    from: {
      opacity: 1,
      fontSize: '18',
      transform: 'translate3d(-20px,100%,0)',
    },
    to: {
      opacity: 1,
      fontSize: '32px',
      transform: 'translate3d(0,0,0)',
    },
  });

  const propsBottom = useSpring({
    reset: activeOption > -1,
    from: {
      opacity: 0,
      transform: 'translate3d(0,-100%,0)',
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
    },
  });

  const propsReverseBottom = useSpring({
    reset: activeOption > -1,
    from: {
      opacity: 0,
      transform: 'translate3d(0,100%,0)',
    },
    to: {
      opacity: 1,
      transform: 'translate3d(0,0,0)',
    },
  });

  let props = {};

  switch (direction) {
    case 'top':
      props = propsTop;
      break;
    case 'bottom':
      props = propsBottom;
      break;
    case 'center':
      props = propsCenter;
      break;
    case 'reverseTop':
      props = propsReverseTop;
      break;
    case 'reverseBottom':
      props = propsReverseBottom;
      break;
    case 'reverseCenter':
      props = propsReverseCenter;
      break;
  }

  return (
    <animated.div key={activeOption} style={animate ? props : {}}>
      <Button onClick={onClick} className={className}>
        {text}
      </Button>
    </animated.div>
  );
};

export default Spoke;
