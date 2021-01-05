import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";

import useUser from "../../hooks/useUser";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Upload from "../upload/Upload";
import MainPage from "../mainPage/MainPage";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    height: "100vh",
    width: "100vw",
  },
  flexChild: {
    padding: "70px",
    flexGrow: 1,
    backgroundColor: theme.palette.common.black,
  },
}));

const Router = () => {
  const isSignedIn = useUser();
  const theme = useTheme();
  const { root, flexChild } = useStyles(theme);

  return (
    <div className={root}>
      <BrowserRouter>
        {isSignedIn !== undefined && (
          <div className={flexChild}>
            <NavigationBar />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/upload" component={Upload} />
            </Switch>
          </div>
        )}
      </BrowserRouter>
    </div>
  );
};

export default Router;
