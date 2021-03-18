import { User } from './initialValues';

interface Action {
  type: 'SIGN_IN' | 'SIGN_OUT' | 'UPDATE_USER';
  value?: Record<string, any>;
}

const reducer = (state: Record<string, any>, action: Action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, user: { ...User, ...action.value, isSignedIn: true } };
    case 'SIGN_OUT':
      return {
        ...state,
        user: { ...User, ...action.value, isSignedIn: false },
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state?.user,
          userDoc: { ...action.value },
        },
      };
    default:
      return state;
  }
};

export default reducer;
