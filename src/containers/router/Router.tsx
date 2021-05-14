import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import useContext from '../../hooks/useContext';

import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Upload from '../upload/Upload';
import ViewImage from '../viewImage/ViewImage';
import WelcomePage from '../welcomePage/WelcomePage';
import Registration from '../registration/Registration';
import BrokenLink from '../../components/BrokenLink/BrokenLink';
import Loader from '../../components/loader/Loader';
import Footer from '../../components/Footer/Footer';
import ViewLists from '../viewLists/ViewLists';
import ViewCollections from '../viewCollections/ViewCollections';
import ViewByTag from '../viewByTag/ViewByTag';
import MyGallery from '../myGallery/MyGallery';
import Notifications from '../notifications/Notifications';
import ViewCollection from '../viewCollection/ViewCollection';

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
  const { state } = useContext((state: any) => state?.sync?.done);

  const WithNav = ({ Page }: any) => {
    const [render, setRender] = React.useState(false);
    const ref = React.useRef<any>();

    React.useEffect(() => {
      if (ref.current) return;
      ref.current = setTimeout(() => {
        setRender(true);
      }, 300);

      return () => {
        if (ref.current) clearTimeout(ref.current);
      };
    }, []);

    return (
      <>
        <div className={navBar}>
          <NavigationBar />
        </div>
        <div className={content}>{render && <Page />}</div>
      </>
    );
  };

  return (
    <div className={color}>
      <Notifications />
      <div className={routes}>
        {!state?.sync?.done && (
          <Switch>
            <Route exact path='/' component={Loader} />
          </Switch>
        )}
        {state?.sync?.done && (
          <Switch>
            <Route exact path='/' component={() => <WithNav Page={WelcomePage} />} />
            <Route exact path='/gallery' component={() => <WithNav Page={MyGallery} />} />
            <Route exact path='/upload' component={() => <WithNav Page={Upload} />} />
            <Route exact path='/view-image' component={ViewImage} />
            <Route exact path='/register' component={() => <WithNav Page={Registration} />} />
            <Route exact path='/lists' component={() => <WithNav Page={ViewLists} />} />
            <Route exact path='/collections' component={() => <WithNav Page={ViewCollections} />} />
            <Route exact path='/collection' component={() => <WithNav Page={ViewCollection} />} />
            <Route exact path='/search' component={() => <WithNav Page={ViewByTag} />} />
            <Route component={BrokenLink} />
          </Switch>
        )}
      </div>
      <Footer />
    </div>
  );
};

// Router.whyDidYouRender = true;

export default Router;
