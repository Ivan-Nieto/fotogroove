import React from 'react';

import initialValues, { InitialValues } from './initialValues';
import reducer, { Action } from './reducer';

export const Context = React.createContext({});

export const useNotifyContext = (): any => React.useContext(Context);

export type Dispatch = (params: Action) => void | undefined;
export interface Values {
  state: InitialValues;
  dispatch: (params: Action) => void | undefined;
}

const NotifyContextProvider = ({ children }: any) => {
  // @ts-ignore
  const [state, dispatch] = React.useReducer(reducer, initialValues);

  return <Context.Provider value={{ state, dispatch } as Values}>{children}</Context.Provider>;
};

export default NotifyContextProvider;
