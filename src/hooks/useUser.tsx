import { useState } from "react";

import store from "../store/index";

const useUser = () => {
  const [user, setUser] = useState(false);

  const checkUserStatue = () => {
    const state = store.getState();
    if (Boolean(state?.user)) setUser(state?.user);
    else setUser(false);
  };
  store.subscribe(checkUserStatue);

  return user;
};

export default useUser;
