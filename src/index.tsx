import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';

import ContextProvider from './context/Context';
import customTheme from './theme/theme';
import Router from './containers/router/Router';

import useSyncAuth from './context/subscriptions/useSyncAuth';
import useSyncUserDoc from './context/subscriptions/useSyncUserDoc';
import useSyncUserCollections from './context/subscriptions/useSyncUserCollections';
import useSyncTags from './context/subscriptions/useSyncTags';
import useUniqueUser from './hooks/useUniqueUser';

const App = () => {
  useSyncAuth();
  useSyncUserDoc();
  useSyncUserCollections();
  useSyncTags();
  useUniqueUser();

  return <Router />;
};

ReactDOM.render(
  <ContextProvider>
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </ContextProvider>,
  document.getElementById('root')
);

reportWebVitals();
