import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import useUser from '../../hooks/useUser';
import useSyncAuth from '../../context/subscriptions/useSyncAuth';
import useSyncUserDoc from '../../context/subscriptions/useSyncUserDoc';
import useSyncUserCollections from '../../context/subscriptions/useSyncUserCollections';

import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Upload from '../upload/Upload';
import ViewImage from '../viewImage/ViewImage';
import Gallery from '../gallery/Gallery';
import WelcomePage from '../welcomePage/WelcomePage';
import Registration from '../registration/Registration';
import BrokenLink from '../../components/BrokenLink/BrokenLink';
import Loader from '../../components/loader/Loader';
import Footer from '../../components/Footer/Footer';

const useStyles = makeStyles((theme: Theme) => ({
  color: {
    backgroundColor: theme.palette.common.black,
    width: '100%',
    maxWidth: '100vw',
    height: '100%',
    minHeight: '100vh',

    display: 'flex',
    flexFlow: 'column',
    overflow: 'auto',
  },
  navBar: {
    height: '80px',
  },
  content: {
    minHeight: '100%',
  },
  routes: {
    flexGrow: 2,
  },
}));

const Router = () => {
  const user = useUser();
  useSyncAuth();
  useSyncUserDoc();
  useSyncUserCollections();
  const theme = useTheme();
  const { color, navBar, content, routes } = useStyles(theme);

  const withNav = (Page: any) => () => {
    return (
      <>
        <div className={navBar}>
          <NavigationBar />
        </div>
        <div className={content}>
          <Page />
        </div>
      </>
    );
  };

  return (
    <div className={color}>
      <div className={routes}>
        <Switch>
          {user == null && <Route exact path='/' component={Loader} />}
          {user != null && (
            <>
              <Route exact path='/' component={withNav(WelcomePage)} />
              <Route exact path='/gallery' component={withNav(Gallery)} />
              <Route exact path='/upload' component={withNav(Upload)} />
              <Route exact path='/view-image' component={ViewImage} />
              <Route exact path='/register' component={withNav(Registration)} />
            </>
          )}
          <Route exact path='*' component={BrokenLink} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default Router;
