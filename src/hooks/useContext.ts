import { useEffect, useState } from 'react';
import _ from 'lodash';

import { useFormContext } from '../context/Context';
import { InitialValues } from '../context/initialValues';

export const useContext = (updateFunction?: (...args: any) => boolean) => {
  const { state } = useFormContext();
  const [localState, setLocalState] = useState(state || {});

  useEffect(() => {
    if (!_.isEqual(state, localState)) {
      if (updateFunction && !updateFunction(state)) return;
      setLocalState(state);
    }

    // eslint-disable-next-line
  }, [state]);

  return { state: localState as InitialValues };
};
export default useContext;
