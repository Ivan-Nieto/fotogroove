import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';

import NotifyContextProvider from './notificationsContext/Context';
import ContextProvider from './context/Context';
import customTheme from './theme/theme';
import Router from './containers/router/Router';

import useSyncAuth from './context/subscriptions/useSyncAuth';
import useSyncUserDoc from './context/subscriptions/useSyncUserDoc';
import useSyncUserCollections from './context/subscriptions/useSyncUserCollections';
import useSyncUserLists from './context/subscriptions/useSyncUserLists';
import useSyncTags from './context/subscriptions/useSyncTags';
import useUniqueUser from './hooks/useUniqueUser';

const App = () => {
  useSyncAuth();
  useSyncUserDoc();
  useSyncUserCollections();
  useSyncUserLists();
  useSyncTags();
  useUniqueUser();

  return <Router />;
};

ReactDOM.render(
  <ContextProvider>
    <NotifyContextProvider>
      <ThemeProvider theme={customTheme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </NotifyContextProvider>
  </ContextProvider>,
  document.getElementById('root')
);

reportWebVitals();
