import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import useUser from '../../hooks/useUser';

import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Upload from '../upload/Upload';
// import MainPage from "../mainPage/MainPage";
import ViewImage from '../viewImage/ViewImage';
import Gallery from '../gallery/Gallery';
import WelcomePage from '../welcomePage/WelcomePage';
import Registration from '../registration/Registration';
import BrokenLink from '../../components/BrokenLink/BrokenLink';

const useStyles = makeStyles((theme: Theme) => ({
  flexChild: {
    minHeight: 'calc(100vh - 140px)',
  },
  color: {
    backgroundColor: theme.palette.common.black,
    maxWidth: 'calc(100vw - 17px)',
    minHeight: '100vh',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  navBar: {
    height: '80px',
  },
  content: {
    height: '100%',
  },
}));

const Router = () => {
  const isSignedIn = useUser();
  const theme = useTheme();
  const { flexChild, link, color, navBar, content } = useStyles(theme);

  const withNav = (Page: any) => () => {
    return (
      <div className={flexChild}>
        <div className={navBar}>
          <NavigationBar />
        </div>
        <div className={content}>
          <Page />
        </div>
      </div>
    );
  };

  return (
    <div className={color}>
      <BrowserRouter>
        {isSignedIn !== undefined && (
          <div>
            <Switch>
              <Route exact path='/' component={withNav(WelcomePage)} />
              <Route exact path='/gallery' component={withNav(Gallery)} />
              <Route exact path='/upload' component={withNav(Upload)} />
              <Route exact path='/view-image' component={ViewImage} />
              <Route exact path='/register' component={withNav(Registration)} />
              <Route exact path='*' component={BrokenLink} />
            </Switch>
          </div>
        )}
      </BrowserRouter>
      <div>
        Icons made by
        <a href='https://www.freepik.com' className={link} title='Freepik'>
          Freepik
        </a>
        from
        <a href='https://www.flaticon.com/' className={link} title='Flaticon'>
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default Router;
