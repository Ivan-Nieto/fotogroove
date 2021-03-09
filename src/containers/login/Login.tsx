import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import useUser from '../../hooks/useUser';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { emailSignIn, signOut } from '../../firebase/auth/index';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '10px 5px',
  },
  input: {
    padding: '0px 10px',
  },
  itemContainer: {
    flex: 1,
    display: 'flex',
    minHeight: '60px',
    alignItems: 'center',
  },
  hidden: {
    padding: '0px 10px',
    display: 'none',
  },
}));

const Login = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const isSignedIn = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleSubmit = async () => {
    setDisabled(true);

    if (!email || !password) {
      setError(true);
      setDisabled(false);
      return;
    }

    const response = await emailSignIn(email, password);
    if (response?.error) {
      setError(true);
      setDisabled(false);
      return;
    }

    setDisabled(false);
    setShowLogin(false);
  };

  const toggleShowLogin = () => {
    if (isSignedIn) {
      signOut();
      return;
    }
    setShowLogin(!showLogin);
  };

  const handleChange = (field: string) => (event: any) => {
    setError(false);
    if (field === 'Password') setPassword(event.target.value);
    else setEmail(event.target.value);
  };

  const getButtonText = () => {
    if (isSignedIn) return 'Log out';
    if (showLogin) return 'Log In';
    return 'Sign In';
  };

  const handleSignUp = () => {
    history.push('/register');
  };

  return (
    <div className={classes.root}>
      <div className={classes.itemContainer}>
        <div
          className={showLogin && !isSignedIn ? classes.input : classes.hidden}
        >
          <Input
            label='Email'
            onChange={handleChange('Email')}
            type='text'
            value={email}
            error={error}
          />
        </div>
        <div
          className={showLogin && !isSignedIn ? classes.input : classes.hidden}
        >
          <Input
            label='Password'
            onChange={handleChange('Password')}
            type='password'
            error={error}
            value={password}
          />
        </div>
        <div className={classes.input}>
          <Button
            variant='outlined'
            disabled={disabled}
            onClick={showLogin ? handleSubmit : toggleShowLogin}
          >
            {getButtonText()}
          </Button>
        </div>
        {!isSignedIn && (
          <div className={classes.input}>
            <Button
              variant='outlined'
              disabled={disabled}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
