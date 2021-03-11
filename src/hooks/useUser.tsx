import { useState, useEffect } from 'react';

import { useFormContext } from '../context/Context';

const useUser = () => {
  const [user, setUser]: any = useState({});
  const { state } = useFormContext();

  useEffect(() => {
    setUser(state?.user);
  }, [state, setUser]);

  return user;
};

export default useUser;
