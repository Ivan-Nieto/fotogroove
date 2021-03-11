import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import './styles.css';

interface Props {
  Primary: any;
  Secondary: any;
  timeout: number;
  move: boolean;
  direction: 'up' | 'right' | 'down';
}

const Slide = ({ Primary, Secondary, timeout, move, direction }: Props) => {
  const [index, set] = useState(0);

  const pages = [
    ({ style }: any) => (
      <animated.div style={style}>
        <Primary />
      </animated.div>
    ),
    ({ style }: any) => (
      <animated.div style={style}>
        <Secondary />
      </animated.div>
    ),
  ];

  const transitionRight = useTransition(index, (p) => p, {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  });

  const transitionUp = useTransition(index, (p) => p, {
    from: { opacity: 0, transform: 'translate3d(0,100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0%,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-50%,0)' },
  });

  const transitionDown = useTransition(index, (p) => p, {
    from: { opacity: 0, transform: 'translate3d(0,-50%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0%,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,100%,0)' },
  });

  let transition;
  switch (direction) {
    case 'up':
      transition = transitionUp;
      break;
    case 'down':
      transition = transitionDown;
      break;
    case 'right':
      transition = transitionRight;
      break;
    default:
      transition = transitionRight;
  }

  useEffect(() => {
    if (timeout > 0 && move) {
      setTimeout(() => {
        set(1);
      }, timeout);

      return () => {
        if (timeout > 0 && move) {
          setTimeout(() => {
            set(1);
          }, timeout);
        }
      };
    }
    return () => {};
  }, [timeout, move]);

  return (
    <div className='simple-trans-main'>
      {transition.map(({ item, props }, idx: number) => {
        const Page = pages[item];
        return <Page key={`page-slide-${idx}`} style={props} />;
      })}
    </div>
  );
};

export default Slide;
