import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@material-ui/core/styles";

import customTheme from "./theme/theme";
import Router from "./containers/router/Router";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
