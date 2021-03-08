import React, { useState, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import './styles.css';

interface Props {
  Primary: any;
  Secondary: any;
  timeout: number;
  move: boolean;
  direction: 'up' | 'right';
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

  const transition = direction === 'up' ? transitionUp : transitionRight;

  useEffect(() => {
    if (timeout > 0 && move) {
      setTimeout(() => {
        set(1);
      }, timeout);
    }
  }, [timeout, move]);

  return (
    <div className='simple-trans-main'>
      {transition.map(({ item, props }, index: number) => {
        const Page = pages[item];
        return <Page key={`page-slide-${index}`} style={props} />;
      })}
    </div>
  );
};

export default Slide;
