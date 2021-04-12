import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import { useFormContext } from '../../context/Context';

import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Upload from '../upload/Upload';
import ViewImage from '../viewImage/ViewImage';
import WelcomePage from '../welcomePage/WelcomePage';
import Registration from '../registration/Registration';
import BrokenLink from '../../components/BrokenLink/BrokenLink';
import Loader from '../../components/loader/Loader';
import Footer from '../../components/Footer/Footer';
import ViewCollections from '../viewCollections/ViewCollections';
import ViewByTag from '../viewByTag/ViewByTag';
import MyGallery from '../myGallery/MyGallery';

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
  const theme = useTheme();
  const { color, navBar, content, routes } = useStyles(theme);
  const { state } = useFormContext();

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
        {!state?.sync?.done && (
          <Switch>
            <Route exact path='/' component={Loader} />
          </Switch>
        )}
        {state?.sync?.done && (
          <Switch>
            <Route exact path='/' component={withNav(WelcomePage)} />
            <Route exact path='/gallery' component={withNav(MyGallery)} />
            <Route exact path='/upload' component={withNav(Upload)} />
            <Route exact path='/view-image' component={ViewImage} />
            <Route exact path='/register' component={withNav(Registration)} />
            <Route exact path='/collections' component={withNav(ViewCollections)} />
            <Route exact path='/search' component={withNav(ViewByTag)} />
            <Route component={BrokenLink} />
          </Switch>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Router;
