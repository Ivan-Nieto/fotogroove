import React from 'react';
import Lottie from 'react-lottie';
import animationJSON from '../../assets/loader.json';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  animation: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: ' translate(-50%, -50%)',
    width: '300px',
    height: '300px',
  },
}));

const Loader = ({ open }: { open: boolean }) => {
  const { animation } = useStyles();

  return (
    <div className={animation}>
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
  );
};

export default Loader;
