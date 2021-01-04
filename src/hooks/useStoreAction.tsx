import store from "../store/index";
import * as user from "../store/actions/user.actions";

type Type = "SIGN_IN" | "SIGN_OUT";

const useStoreAction = () => {
  const runAction = async (type: Type, payload: any) => {
    switch (type) {
      case "SIGN_IN":
        store.dispatch(user.signIn(payload));
        break;
      case "SIGN_OUT":
        store.dispatch(user.signOut());
        break;
      default:
    }
  };

  return runAction;
};

export default useStoreAction;
