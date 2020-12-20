import { SIGN_IN } from "../actions/user.actions";
import { combineReducers } from "redux";

const User = {
  userName: "",
};

interface Action {
  type: string;
  value: any;
}

const signInUser = (user = User, action: Action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...user, ...action.value };

    default:
      return user;
  }
};

const reducers = combineReducers({
  user: signInUser,
});

export default reducers;
