import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';

import ContextProvider from './context/Context';
import customTheme from './theme/theme';
import Router from './containers/router/Router';

ReactDOM.render(
  <ContextProvider>
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  </ContextProvider>,
  document.getElementById('root')
);

reportWebVitals();
