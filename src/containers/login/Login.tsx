import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import useUser from '../../hooks/useUser';

import Button from '../../components/Button/Button';
import { signOut } from '../../firebase/auth/index';
import InputModal from './InputModal';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '10px 5px',
  },
  input: {
    padding: '10px',
  },
  itemContainer: {
    flex: 1,
    display: 'flex',
    minHeight: '60px',
    alignItems: 'center',
  },
}));

const Login = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const user = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const history = useHistory();

  const toggleShowLogin = async () => {
    if (user?.isSignedIn) {
      await signOut();
      history.push('/');
      return;
    }
    setShowLogin(!showLogin);
  };

  const handleSignUp = () => {
    history.push('/register');
  };

  return (
    <>
      <InputModal showLogin={showLogin} setShowLogin={setShowLogin} />
      <div className={classes.root}>
        <div className={classes.itemContainer}>
          <div className={classes.input}>
            <Button variant='outlined' onClick={toggleShowLogin}>
              Sign In
            </Button>
          </div>
          {!user?.isSignedIn && (
            <div className={classes.input}>
              <Button variant='outlined' onClick={handleSignUp}>
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
