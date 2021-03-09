import React, { useState } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Formik, Form } from 'formik';

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
  const [fields, setFields]: any = useState({});

  const inputs = ['Username', 'Email', 'Password', 'Confirm Password'];

  const handleChange = (key: string) => (event: any) => {
    setFields({ ...fields, [key]: event.target.value });
  };

  const handleSubmit = () => {};

  return (
    <div className={classes.root}>
      <div className={classes.inputs}>
        {inputs.map((e) => (
          <div className={classes.item} key={e}>
            <Input
              onChange={handleChange(e)}
              label={e}
              value={fields[e] || ''}
              type='text'
            />
          </div>
        ))}
        <div className={classes.item}>
          <Button variant='outlined'>Sign up</Button>
        </div>
      </div>
    </div>
  );
};

export default RenderSignUp;
