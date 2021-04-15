import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import useUser from '../../hooks/useUser';

import TagSearchField from '../TagSearchField/TagSearchField';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import Login from '../../containers/login/Login';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      top: '0',
      right: '0',
      left: '0',
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      cursor: 'pointer',
      flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
    icon: {
      fontSize: '35px !important',
    },
  })
);

export default function NavigationBar() {
  const classes = useStyles();
  const history = useHistory();
  const user = useUser();

  return (
    <div>
      <AppBar position='relative' className={classes.appBar}>
        <Toolbar>
          <Typography onClick={() => history.push('/')} variant='h5' className={classes.title}>
            Fotogroove
          </Typography>
          <TagSearchField />
          {!user?.isSignedIn && <Login />}
          {user?.isSignedIn && <ProfileDropdown />}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
}
