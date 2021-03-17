import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import Input from '../Input/Input';
import Button from '../Button/Button';
import { firestore } from '../../firebase/init';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
  },
  input: {
    backgroundColor: theme.palette.grey[100],
    padding: '0px 10px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  btn: {
    marginTop: '20px',
  },
  notchedOutline: {
    border: 'none !important',
  },
}));

const RenderDescription = ({
  image,
  ownsImage,
  open,
}: {
  open: boolean;
  ownsImage: boolean;
  image?: Record<string, any>;
}) => {
  const theme = useTheme();
  const { root, input, content, btn, notchedOutline } = useStyles(theme);
  const [description, setDescription] = useState(image?.description);
  const [updateDescription, setUpdateDescription] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDescription(image?.description || '');
  }, [image, setDescription]);

  const handleChangeDescription = (event: any) => {
    setDescription(event.target.value || '');
    setUpdateDescription(true);
  };

  const handleUpdateDescription = async () => {
    if (!image?.docId || image?.docId === '') return;
    setDisabled(true);

    await firestore
      .collection('images')
      .doc(image?.docId)
      .update({
        description,
      })
      .catch(() => {});

    setUpdateDescription(false);
    setDisabled(false);
  };

  return (
    <ListItem className={root}>
      {open && (
        <>
          {ownsImage && (
            <div className={content}>
              <Input
                type='text'
                value={description || ''}
                className={input}
                multiline
                {...(description === ''
                  ? { label: 'Click to add description' }
                  : {})}
                onChange={handleChangeDescription}
                onClick={() => setUpdateDescription(true)}
                InputProps={{
                  classes: {
                    notchedOutline: notchedOutline,
                  },
                }}
                rowsMax={10}
              />
              {updateDescription && (
                <Button
                  size='small'
                  className={btn}
                  disabled={disabled}
                  onClick={handleUpdateDescription}
                >
                  Update
                </Button>
              )}
            </div>
          )}
          {!ownsImage && <ListItemText>{description}</ListItemText>}
        </>
      )}
    </ListItem>
  );
};

export default RenderDescription;
