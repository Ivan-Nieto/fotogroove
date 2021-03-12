import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Lottie from 'react-lottie';
import animationJSON from '../../assets/50479-sleeping-404.json';

const useClasses = makeStyles({
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: ' translate(-50%, -50%)',
    width: '300px',
    height: '300px',
  },
  wrapper: {
    width: '100vw',
    height: '100vh',
  },
});

const AddisonLoader = () => {
  const { loader, wrapper } = useClasses();

  return (
    <div className={wrapper}>
      <div className={loader}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animationJSON,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid meet',
            },
          }}
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default AddisonLoader;
