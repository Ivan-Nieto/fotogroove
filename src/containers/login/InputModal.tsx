import React, { useState } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { emailSignIn, sendPasswordResetEmail } from '../../firebase/auth/index';
import Modal from '../../components/Modal/Modal';
import useEnterKey from '../../hooks/useEnterKey';

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    padding: '10px',
    outline: 'none',
    margin: 'auto',
  },
  modalContainer: {
    padding: '30px',
    borderRadius: '10px',

    outline: 'none',

    display: 'flex',
    flexWrap: 'wrap',
  },
  divider: {
    borderLeft: '1px solid #f2f2f2',
    width: '2px',
    minHeight: 'calc(100% - 20px)',
  },
  button: {
    padding: '30px 10px 10px',
    marginTop: 'auto',
  },
  inputTitle: {
    marginTop: '0px',
  },
  inputContainer: {
    alignItems: 'center',
    verticalAlign: 'top',
    position: 'relative',

    outline: 'none',
    display: 'flex',
    flexDirection: 'column',

    minHeight: '100%',
    padding: '30px',
  },
}));

const InputModal = ({ showLogin, setShowLogin }: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [fields, setFields] = useState({
    email: '',
    password: '',
    resetEmail: '',
  });
  const [onLogin, setOnLogin] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    setDisabled(true);

    if (fields.email === '' || fields.password === '') {
      setError(true);
      setDisabled(false);
      return;
    }

    const response = await emailSignIn(fields.email, fields.password);
    if (response?.error) {
      setDisabled(false);
      setError(true);
    }
  };

  const handleSubmitReset = async () => {
    if (fields.resetEmail === '') {
      setError(true);
      return;
    }

    try {
      await sendPasswordResetEmail(fields.resetEmail);
      setShowLogin(!showLogin);
    } catch (error) {
      setError(true);
    }
  };

  useEnterKey(onLogin ? handleSubmit : handleSubmitReset);

  const handleChange = (field: string) => (event: any) => {
    setError(false);
    if (field === 'resetEmail') setOnLogin(false);
    else setOnLogin(true);
    setFields({ ...fields, [field]: event.target.value });
  };

  return (
    <Modal open={showLogin} setOpen={setShowLogin}>
      <div className={classes.modalContainer}>
        <div className={classes.inputContainer}>
          <div className={classes.inputTitle}>
            <Typography variant='h5'>Sign In</Typography>
          </div>
          <div className={classes.input}>
            <Input
              label='Email'
              onChange={handleChange('email')}
              type='text'
              autofocus
              value={fields.email}
              error={error}
            />
          </div>
          <div className={classes.input}>
            <Input
              label='Password'
              onChange={handleChange('password')}
              type='password'
              error={error}
              value={fields.password}
            />
          </div>
          <div className={classes.button}>
            <Button
              variant='outlined'
              disabled={disabled}
              onClick={handleSubmit}
            >
              Log In
            </Button>
          </div>
        </div>

        <div className={classes.inputContainer}>
          <div className={classes.divider} />
        </div>

        <div className={classes.inputContainer}>
          <div className={classes.inputTitle}>
            <Typography variant='h5'>Forgot Password</Typography>
          </div>
          <div className={classes.input}>
            <Input
              label='Email'
              onChange={handleChange('resetEmail')}
              type='text'
              value={fields.resetEmail}
              error={error}
            />
          </div>
          <div className={classes.button}>
            <Button
              variant='outlined'
              disabled={disabled}
              onClick={handleSubmitReset}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InputModal;
