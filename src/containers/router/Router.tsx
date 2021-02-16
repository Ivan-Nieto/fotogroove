import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";

import useUser from "../../hooks/useUser";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Upload from "../upload/Upload";
import MainPage from "../mainPage/MainPage";
import ViewImage from "../viewImage/ViewImage";

const useStyles = makeStyles((theme: Theme) => ({
  flexChild: {
    minHeight: "calc(100vh - 140px)",
    padding: "70px",
  },
  color: {
    backgroundColor: theme.palette.common.black,
    maxWidth: "100vw",
    minHeight: "100vh",
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

const Router = () => {
  const isSignedIn = useUser();
  const theme = useTheme();
  const { flexChild, link, color } = useStyles(theme);

  const withNav = (Page: any) => () => {
    return (
      <div className={flexChild}>
        <NavigationBar />
        <Page />
      </div>
    );
  };

  return (
    <div className={color}>
      <BrowserRouter>
        {isSignedIn !== undefined && (
          <div>
            <Switch>
              <Route exact path="/" component={withNav(MainPage)} />
              <Route exact path="/upload" component={withNav(Upload)} />
              <Route exact path="/view-image" component={ViewImage} />
            </Switch>
          </div>
        )}
      </BrowserRouter>
      <div>
        Icons made by
        <a href="https://www.freepik.com" className={link} title="Freepik">
          Freepik
        </a>
        from
        <a href="https://www.flaticon.com/" className={link} title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default Router;
