import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core/styles';

import ContextProvider from './context/Context';
import customTheme from './theme/theme';
import Router from './containers/router/Router';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider theme={customTheme}>
        <Router />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
