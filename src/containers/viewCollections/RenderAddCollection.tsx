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

const RenderAddList = ({ uid, open, addList }: { addList: any; uid: string; open: boolean }) => {
  const theme = useTheme();
  const { root, input, content, btn } = useStyles(theme);
  const [listName, setListName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const ref = React.useRef(false);

  React.useEffect(
    () => () => {
      ref.current = true;
    },
    []
  );

  const handleChangeDescription = (event: any) => {
    setListName(event.target.value || '');
    setError(false);
  };

  const handleAddCollection = async () => {
    if (listName === '') {
      setError(true);
      return;
    }
    setDisabled(true);

    await firestore
      .collection('users')
      .doc(uid)
      .collection('collections')
      .add({
        name: listName,
        images: [],
        protected: false,
      })
      .then(() => {
        addList(listName);
      })
      .catch(() => {});

    if (ref.current) return;
    setListName('');
    setDisabled(false);
  };

  return (
    <ListItem className={root}>
      {open && (
        <div className={content}>
          <Input
            error={error}
            type='text'
            value={listName || ''}
            className={input}
            label='New Collection Name'
            onChange={handleChangeDescription}
          />
          <Button size='small' className={btn} disabled={disabled} onClick={handleAddCollection}>
            Add Collection
          </Button>
        </div>
      )}
    </ListItem>
  );
};

export default RenderAddList;
