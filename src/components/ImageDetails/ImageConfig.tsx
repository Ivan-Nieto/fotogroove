import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Modal from '../Modal/Modal';

import useUser from '../../hooks/useUser';
import useNotify from '../../hooks/useNotify';

import { firestore } from '../../firebase/init';
import { deleteFolder } from '../../firebase/storage/delete';

const useStyles = makeStyles((theme: Theme) => ({
  root: { width: 'calc(100% - 40px)', padding: '10px' },
  title: { width: '100%' },
  rootButton: { margin: '10px', color: 'red' },
  delete: {
    margin: '20px',
    color: 'red',
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

const ImageConfig = ({ open, image }: { open: boolean; image: any }) => {
  const user = useUser();
  const notify = useNotify();
  const [disabled, setDisabled] = React.useState(false);
  const [hide, setHide] = React.useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);

  const deleteImage = async () => {
    setHide(false);
    if (!user?.isSignedIn || user.uid !== image?.author || !Boolean(image?.docId)) return;

    setDisabled(true);

    // Delete image document
    await firestore
      .collection('images')
      .doc(image.docId)
      .delete()
      .then(() => {
        notify({ content: 'Image deleted' });
      })
      .catch(() => {
        notify({ severity: 'error', content: 'Failed to delete image' });
      });

    // Delete image folder
    await deleteFolder(`images/${user.uid}/${image.docId}`);

    setDisabled(false);
  };

  return !open || !user?.isSignedIn || user?.uid !== image?.author ? (
    <div></div>
  ) : (
    <div className={classes.root}>
      <Button disabled={hide} onClick={() => setHide(true)} variant='outlined' color='inherit' className={classes.rootButton}>
        Delete Image
      </Button>
      <Modal open={hide} setOpen={setHide}>
        <div className={classes.modal}>
          <Typography className={classes.title} variant='h4'>
            Are you sure you want to delete this image?
          </Typography>
          <div className={classes.buttons}>
            <Button disabled={disabled} onClick={deleteImage} variant='outlined' color='inherit' className={classes.delete}>
              Delete
            </Button>
            <Button disabled={disabled} onClick={() => setHide(false)} variant='contained' color='inherit' className={classes.cancel}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageConfig;
