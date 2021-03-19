import { useEffect, useState } from 'react';

const useScroll = () => {
  const [bottomHit, setBottomHit] = useState(0);

  useEffect(() => {
    const handleScroll = (ev: any) => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        setBottomHit(bottomHit + 1);
      }
    };
    window?.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  return bottomHit;
};

export default useScroll;
