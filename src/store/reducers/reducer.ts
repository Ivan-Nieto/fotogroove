import { SIGN_IN, SIGN_OUT } from "../actions/user.actions";
import { combineReducers } from "redux";

const User = {
  userName: "",
};

interface Action {
  type: string;
  value: any;
}

const handleUser = (user = User, action: Action) => {
  switch (action.type) {
    case SIGN_IN:
      return action.value;

    case SIGN_OUT:
      return false;

    default:
      return user;
  }
};

const reducers = combineReducers({
  user: handleUser,
});

export default reducers;
