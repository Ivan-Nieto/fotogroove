import React from 'react';

import initialValues, { InitialValues } from './initialValues';
import reducer from './reducer';

export const Context = React.createContext({});

export const useNotifyContext = (): any => React.useContext(Context);

const NotifyContextProvider = ({ children }: any) => {
  // @ts-ignore
  const [state, dispatch]: Array<InitialValues | any> = React.useReducer(reducer, initialValues);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export default NotifyContextProvider;
