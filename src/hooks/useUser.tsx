import { useState } from "react";
import { auth } from "../firebase/init";
import useStore from "./useStore";

const useUser = () => {
  const [user, setUser]: any = useState(undefined);
  const store = useStore();

  auth.onAuthStateChanged((usr) => {
    if (usr) {
      // User is signed in.
      setUser(usr);
      store("SIGN_IN", usr);
    } else {
      // No user is signed in.
      setUser(undefined);
      store("SIGN_OUT", {});
    }
  });

  return user;
};

export default useUser;
