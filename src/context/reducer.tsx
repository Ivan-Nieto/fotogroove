interface Action {
  type: 'SIGN_IN' | 'SIGN_OUT';
  value?: Record<string, any>;
}

const reducer = (state: Record<string, any>, action: Action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return { ...state, user: { ...action.value, isSignedIn: true } };
    case 'SIGN_OUT':
      return { ...state, user: { ...action.value, isSignedIn: false } };

    default:
      return state;
  }
};

export default reducer;
