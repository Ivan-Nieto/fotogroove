import React, { useState } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Button from '../../components/Button/Button';
import * as Yup from 'yup';

import { functions, firestore } from '../../firebase/init';
import RenderForm from '../../components/RenderForm/RenderForm';
import { emailSignIn } from '../../firebase/auth/index';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.grey[800],
    display: 'flex',
  },
  item: {
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    padding: '30px',
    margin: 'auto',

    borderRadius: '10px',
    backgroundColor: theme.palette.grey[100],
  },
}));

const RenderSignUp = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [disabled, setDisabled] = useState(false);

  const inputs = [
    {
      type: 'text',
      validation: Yup.string().min(3, 'Invalid').required('Required'),
      initialValue: '',
      key: 'userName',
      label: 'Username',
    },
    {
      type: 'text',
      validation: Yup.string().email('Invalid').required('Required'),
      initialValue: '',
      key: 'email',
      component: '',
      label: 'Email',
    },
    {
      type: 'password',
      validation: Yup.string().min(3, 'Invalid').required('Required'),
      initialValue: '',
      key: 'password',
      label: 'Password',
    },
  ];

  const createUser = functions.httpsCallable('createUser');

  const handleSubmit = async (event: any, { setErrors }: any) => {
    setDisabled(true);

    // Make sure username is unique
    const exists = await firestore
      .collection('usernames')
      .where('userName', '==', event?.userName || '')
      .get()
      .then((snapshot) => {
        return snapshot.size > 0;
      })
      .catch(() => {
        return true;
      });

    if (exists) {
      setErrors({ userName: 'Username already exists' });
      setDisabled(false);
      return;
    }

    // Make sure all fields where filled

    const response = await createUser(event).catch(() => ({
      data: { error: true },
    }));
    if (response?.data?.error) {
      switch (response.data.code) {
        case 'ALREADY_EXISTS':
          setErrors({ email: 'An account with this email already exists' });
          break;
      }
      setDisabled(false);
    } else {
      setDisabled(false);
      emailSignIn(event.email, event.password);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.inputs}>
        <RenderForm
          fields={inputs}
          onSubmit={handleSubmit}
          formName='registration-form'
        />
        <div className={classes.item}>
          <Button
            disabled={disabled}
            variant='outlined'
            type='submit'
            form='registration-form'
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RenderSignUp;
