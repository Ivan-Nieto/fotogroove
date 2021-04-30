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
import Input from '../../components/Input/Input';

const useStyles = makeStyles((theme: Theme) => ({
  title: { width: 'calc(100% - 40px)', minWidth: '300px', margin: '20px' },
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

const RenderListEdit = ({ activeList, user, updateList, removeList }: any) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [name, setName] = useState(activeList?.name || '');

  const classes = useStyles();
  const notify = useNotify();

  React.useEffect(() => {
    setName(activeList?.name || '');
  }, [activeList]);

  const clean = () => [setOpen, setEdit, setDisabled].map((e) => e(false));

  const del = async () => {
    setDisabled(true);
    if (!Boolean(activeList?.docId) || !Boolean(user?.isSignedIn) || !Boolean(user?.uid)) return clean();

    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('lists')
      .doc(activeList.docId)
      .delete()
      .then(() => {
        removeList();
        notify({ content: `List deleted`, severity: 'success' });
      })
      .catch(() => {
        notify({ content: `Failed to delete list`, severity: 'error' });
      });

    clean();
  };

  const update = async () => {
    setDisabled(true);
    if (
      !Boolean(activeList?.docId) ||
      !Boolean(user?.isSignedIn) ||
      !Boolean(user?.uid) ||
      !Boolean(name?.trim()) ||
      name?.trim() === activeList?.name
    )
      return clean();

    // Update collection information
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .collection('lists')
      .doc(activeList.docId)
      .update({
        name: name?.trim(),
      })
      .then(() => {
        updateList({ name: name?.trim() });
        notify({ content: `List updated`, severity: 'success' });
      })
      .catch(() => {
        notify({ content: `Failed to update list`, severity: 'error' });
      });

    clean();
  };

  const actions: Action[] = [
    {
      name: 'Delete List',
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
            Are you sure you want to delete {activeList?.name ? <strong>{activeList?.name}</strong> : 'this list'}?
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
          <Input className={classes.title} onChange={(event: any) => setName(event.target.value)} type='text' label='List Name' value={name} />
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

export default RenderListEdit;
