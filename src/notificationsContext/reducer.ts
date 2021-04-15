import { InitialValues } from './initialValues';

export interface Action {
  type: 'ADD_NOTIFICATION' | 'REMOVE_NOTIFICATION' | 'UPDATE_FIRST_VISIT';
  value?: Record<string, any> | string | boolean;
}

const reducer = (state: InitialValues, action: Action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return { ...state, notifications: [...state?.notifications, action.value] };

    case 'REMOVE_NOTIFICATION':
      return { ...state, notifications: state?.notifications?.filter((e) => e.id !== action.value) };

    case 'UPDATE_FIRST_VISIT':
      return { ...state, firstVisit: Boolean(action.value) };

    default:
      return state;
  }
};

export default reducer;
