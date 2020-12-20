import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";

import NavigationBar from "../../components/NavigationBar/NavigationBar";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexFlow: "column",
    minHeight: "100%",
    width: "100%",
    overflow: "auto",
  },
  flexChild: {
    flexGrow: 2,
  },
}));

const Router = () => {
  const theme = useTheme();
  const { root, flexChild } = useStyles(theme);

  return (
    <div className={root}>
      <div className={flexChild}>
        <BrowserRouter>
          <NavigationBar />
          <Switch>
            <Route path="/" component={() => <div>test</div>} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Router;
