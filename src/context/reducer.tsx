import { user } from './initialValues';

export interface Action {
  type: 'SIGN_IN' | 'SIGN_OUT' | 'UPDATE_USER' | 'UPDATE_USER_COLLECTIONS' | 'UPDATE_TAGS' | 'ADD_SYNC' | 'REMOVE_SYNC';
  value?: Record<string, any>;
}

const reducer = (state: Record<string, any>, action: Action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, user: { ...user, ...action.value, isSignedIn: true } };
    case 'SIGN_OUT':
      return {
        ...state,
        user: { ...user, ...action.value, isSignedIn: false },
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

    case 'ADD_SYNC':
      return {
        ...state,
        sync: {
          done: false,
          syncing: {
            ...state?.sync?.syncing,
            [action.value?.id]: true,
          },
        },
      };

    case 'REMOVE_SYNC':
      const newSyncing = state?.sync?.syncing || {};
      newSyncing[action?.value?.id || ''] = false;
      return {
        ...state,
        sync: {
          done: Object.keys(newSyncing).every((e) => !Boolean(newSyncing[e])),
          syncing: newSyncing,
        },
      };

    default:
      return state;
  }
};

export default reducer;
