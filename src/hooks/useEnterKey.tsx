import { useEffect } from 'react';

const useEnterKey = (f: () => void) => {
  useEffect(() => {
    const handleKeydown = (evt: globalThis.KeyboardEvent) => {
      const { key } = evt;
      if (key === 'Enter') {
        f();
        evt.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [f]);
};

export default useEnterKey;
