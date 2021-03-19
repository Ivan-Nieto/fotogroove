import React, { useState } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { emailSignIn } from '../../firebase/auth/index';
import Modal from '../../components/Modal/Modal';
import useEnterKey from '../../hooks/useEnterKey';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '10px 5px',
  },
  input: {
    padding: '10px',
  },
  modalContainer: {
    padding: '30px',
    borderRadius: '10px',

    alignItems: 'center',
    justifyItems: 'center',
  },
}));

const InputModal = ({ showLogin, setShowLogin }: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    setDisabled(true);

    if (!email || !password) {
      setError(true);
      setDisabled(false);
      return;
    }

    const response = await emailSignIn(email, password);
    if (response?.error) {
      setDisabled(false);
      setError(true);
    }
  };

  useEnterKey(handleSubmit);

  const handleChange = (field: string) => (event: any) => {
    setError(false);
    if (field === 'Password') setPassword(event.target.value);
    else setEmail(event.target.value);
  };

  return (
    <Modal open={showLogin} setOpen={setShowLogin}>
      <div className={classes.modalContainer}>
        <div className={classes.input}>
          <Input
            label='Email'
            onChange={handleChange('Email')}
            type='text'
            value={email}
            error={error}
          />
        </div>
        <div className={classes.input}>
          <Input
            label='Password'
            onChange={handleChange('Password')}
            type='password'
            error={error}
            value={password}
          />
        </div>
        <div className={classes.input}>
          <Button variant='outlined' disabled={disabled} onClick={handleSubmit}>
            Log In
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default InputModal;
