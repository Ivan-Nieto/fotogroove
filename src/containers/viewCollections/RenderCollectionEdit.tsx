import React, { useState } from 'react';
import firebase from 'firebase/app';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import useNotify from '../../hooks/useNotify';

import SpeedDial, { Action } from '../../components/SpeedDial/SpeedDial';
import Modal from '../../components/Modal/Modal';

const useStyles = makeStyles((theme: Theme) => ({
  title: { width: '100%' },
  delete: {
    margin: '20px',
    color: theme.palette.error.main,
    float: 'right',
  },
  success: {
    margin: '20px',
    color: theme.palette.success.main,
    float: 'right',
  },
  cancel: {
    margin: '20px',
    color: theme.palette.grey[400],
    float: 'right',
  },
  modal: {
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  buttons: {
    width: '100%',
    float: 'right',
    padding: '30px 10px 0px 10px',
  },
}));

const RenderCollectionEdit = ({ activeCollection, user, images }: any) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const classes = useStyles();
  const notify = useNotify();

  const clean = () => {
    setOpen(false);
    setEdit(false);
    setDisabled(false);
  };

  const del = async () => {
    setDisabled(true);
    if (!Boolean(activeCollection?.name) || !Boolean(user?.isSignedIn) || !Boolean(user?.uid)) return clean();

    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('collections')
      .doc(activeCollection.docId)
      .delete()
      .then(() => {
        notify({ content: `Collection deleted`, severity: 'success' });
      })
      .catch(() => {
        notify({ content: `Failed to delete collection`, severity: 'error' });
      });

    clean();
  };

  const update = async () => {
    setDisabled(true);
    if (!Boolean(activeCollection?.name) || !Boolean(user?.isSignedIn) || !Boolean(user?.uid)) return clean();

    clean();
  };

  const actions: Action[] = [
    {
      name: 'Delete Collection',
      icon: <DeleteIcon className={classes.delete} />,
      onClick: () => setOpen(true),
    },
    {
      name: 'Edit Details',
      icon: <EditIcon />,
      onClick: () => setEdit(true),
    },
  ];

  return (
    <div>
      <SpeedDial actions={actions} />
      <Modal open={open} setOpen={setOpen}>
        <div className={classes.modal}>
          <Typography className={classes.title} variant='h4'>
            Are you sure you want to delete {activeCollection?.name ? <strong>{activeCollection?.name}</strong> : 'this collection'}?
          </Typography>
          <div className={classes.buttons}>
            <Button disabled={disabled} onClick={del} variant='outlined' color='inherit' className={classes.delete}>
              Delete
            </Button>
            <Button disabled={disabled} onClick={() => setOpen(false)} variant='contained' color='inherit' className={classes.cancel}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      <Modal open={edit} setOpen={setEdit}>
        <div className={classes.modal}>
          <div className={classes.buttons}>
            <Button disabled={disabled} onClick={update} variant='outlined' color='inherit' className={classes.success}>
              Update
            </Button>
            <Button disabled={disabled} onClick={() => setEdit(false)} variant='contained' color='inherit' className={classes.cancel}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RenderCollectionEdit;
