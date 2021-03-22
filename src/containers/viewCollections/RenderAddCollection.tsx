import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { firestore } from '../../firebase/init';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
  },
  input: {
    backgroundColor: theme.palette.grey[100],
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  btn: {
    marginTop: '20px',
  },
}));

const RenderAddCollection = ({
  uid,
  open,
  addCollection,
}: {
  addCollection: any;
  uid: string;
  open: boolean;
}) => {
  const theme = useTheme();
  const { root, input, content, btn } = useStyles(theme);
  const [collectionName, setCollectionName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);

  const handleChangeDescription = (event: any) => {
    setCollectionName(event.target.value || '');
    setError(false);
  };

  const handleAddCollection = async () => {
    if (collectionName === '') {
      setError(true);
      return;
    }
    setDisabled(true);

    await firestore
      .collection('users')
      .doc(uid)
      .collection('collections')
      .add({
        name: collectionName,
        images: [],
        protected: false,
      })
      .then(() => {
        addCollection(collectionName);
      })
      .catch(() => {});

    setCollectionName('');
    setDisabled(false);
  };

  return (
    <ListItem className={root}>
      {open && (
        <div className={content}>
          <Input
            error={error}
            type='text'
            value={collectionName || ''}
            className={input}
            label='New Collection Name'
            onChange={handleChangeDescription}
          />
          <Button
            size='small'
            className={btn}
            disabled={disabled}
            onClick={handleAddCollection}
          >
            Add Collection
          </Button>
        </div>
      )}
    </ListItem>
  );
};

export default RenderAddCollection;
