import { User } from './initialValues';

export interface Action {
  type:
    | 'SIGN_IN'
    | 'SIGN_OUT'
    | 'UPDATE_USER'
    | 'UPDATE_USER_COLLECTIONS'
    | 'UPDATE_TAGS';
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
    case 'UPDATE_USER_COLLECTIONS':
      return {
        ...state,
        user: {
          ...state?.user,
          collections: action.value,
        },
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state?.user,
          userDoc: { ...action.value },
        },
      };
    case 'UPDATE_TAGS':
      return {
        ...state,
        tags: action.value || [],
      };

    default:
      return state;
  }
};

export default reducer;
