import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSpring, animated as a } from 'react-spring';
import { makeStyles } from '@material-ui/core/styles';
import Lottie from 'react-lottie';
import animationJSON from '../../assets/50479-sleeping-404.json';

const useClasses = makeStyles({
  addison_loading: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface AddisonLoaderProps {
  width?: number;
  height?: number;
  immediate?: boolean;
}

const AddisonLoader = ({
  width = 400,
  immediate = false,
}: AddisonLoaderProps) => {
  const { addison_loading } = useClasses();
  const history = useHistory();
  const fadeIn = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
    immediate,
  });

  // Re-route after 10 seconds
  useEffect(() => {
    setTimeout(() => history.push('/'), 10000);
    // eslint-disable-next-line
  }, []);

  return (
    <a.div
      style={fadeIn}
      className={addison_loading}
      data-testid='loading-animation'
    >
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: animationJSON,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
          },
        }}
        width={width}
        height={width}
      />
    </a.div>
  );
};

export default AddisonLoader;
