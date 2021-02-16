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
    maxWidth: "100vw",
    padding: "70px",
    backgroundColor: theme.palette.common.black,
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
}));

const Router = () => {
  const isSignedIn = useUser();
  const theme = useTheme();
  const { flexChild, link } = useStyles(theme);

  return (
    <div className={flexChild}>
      <BrowserRouter>
        {isSignedIn !== undefined && (
          <div>
            <NavigationBar />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/upload" component={Upload} />
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
