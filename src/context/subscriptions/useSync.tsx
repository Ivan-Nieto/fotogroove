import { useState, useEffect } from 'react';

import { useFormContext } from '../Context';

const useSync = (id: string) => {
  const [finished, setFinished] = useState(false);
  const [run, setRun] = useState(0);
  const [firstRun, setFirstRun] = useState(true);
  const { dispatch, state } = useFormContext();

  useEffect(() => {
    let mount = true;
    if (firstRun) {
      setFirstRun(false);
      return;
    }

    if (!mount) return;

    if (finished) return;
    setFinished(true);

    if (state?.sync?.done || !state?.sync?.syncing[id]) return;

    dispatch({
      type: 'REMOVE_SYNC',
      value: { id },
    });

    return () => {
      mount = false;
    };

    // eslint-disable-next-line
  }, [run]);

  useEffect(() => {
    dispatch({
      type: 'ADD_SYNC',
      value: { id },
    });
    // eslint-disable-next-line
  }, []);

  return () => setRun(Math.random());
};

export default useSync;
