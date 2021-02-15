import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";

import useUser from "../../hooks/useUser";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Upload from "../upload/Upload";
import MainPage from "../mainPage/MainPage";

const useStyles = makeStyles((theme: Theme) => ({
  flexChild: {
    minHeight: "calc(100vh - 140px)",
    maxWidth: "100vw",
    padding: "70px",
    backgroundColor: theme.palette.common.black,
  },
}));

const Router = () => {
  const isSignedIn = useUser();
  const theme = useTheme();
  const { flexChild } = useStyles(theme);

  return (
    <div>
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
