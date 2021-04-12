import { useState, useEffect } from 'react';
import _ from 'lodash';

import { useFormContext } from '../context/Context';
import { User, user as userInitialState } from '../context/initialValues';

const useUser = (): User => {
  const [user, setUser]: any = useState(userInitialState);
  const { state } = useFormContext();

  useEffect(() => {
    if (!_.isEqual(user, state?.user)) {
      setUser(state?.user);
    }

    // eslint-disable-next-line
  }, [state, setUser]);

  return user;
};

export default useUser;
