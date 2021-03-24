import { useEffect, useState } from 'react';

const useScroll = () => {
  const [bottomHit, setBottomHit] = useState(0);

  useEffect(() => {
    const handleScroll = (ev: any) => {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight
      ) {
        // Set bottomHit to a random integer between 1 and 999,999
        setBottomHit(Math.floor(Math.random() * 999999) + 1);
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
