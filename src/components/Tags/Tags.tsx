import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import Button from '../Button/Button';

import useFocus from '../../hooks/useFocus';

import Input from '../Input/Input';

import { firestore } from '../../firebase/init';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: '10px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  card: {
    backgroundColor: theme.palette.grey[200],
  },
  title: {
    width: '100%',
    textAlign: 'left',
    paddingBottom: '10px',
  },
  tags: {
    minWidth: '50px',
    minHeight: '30px',

    borderRadius: '7px',
    display: 'flex',
    flexWrap: 'wrap',

    padding: '10px',
  },
  button: {
    marginTop: '10px',
    justifyContent: 'left',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Tags = ({
  tags,
  open,
  docId,
  disableUpdate,
}: {
  docId?: string;
  tags?: string[];
  open?: boolean;
  disableUpdate?: boolean;
}) => {
  const theme = useTheme();
  const [inputRef, setInputFocus] = useFocus();
  const classes = useStyles(theme);
  const [disable, setDisable] = useState(false);
  const [newTag, setNewTags] = useState('');
  const [error, setError] = useState(false);
  const [localTags, setLocalTags] = useState(tags || []);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (tags) setLocalTags(tags);
  }, [tags]);

  const addTag = async () => {
    if (newTag && newTag !== '') {
      setDisable(true);
      await firestore
        .collection('images')
        .doc(docId)
        .update({
          tags: localTags.concat([newTag]),
        })
        .then(() => {
          setLocalTags(localTags?.concat([newTag]));
          setNewTags('');
          setError(false);
        })
        .catch(() => {
          setError(true);
        });
      setDisable(false);
    }
    await setInputFocus();
  };

  const handleChange = (event: any) => {
    const newStr: string = event.target.value || '';
    setNewTags(newStr.toLowerCase().replaceAll(' ', '-'));
  };

  const handleDelete = (id: string) => async () => {
    // Create new array of tags with current removed
    const newTags = localTags.filter((e) => e !== id) || [];
    setLocalTags(newTags);

    await firestore
      .collection('images')
      .doc(docId)
      .update({
        tags: newTags,
      })
      .catch(() => {});
  };

  return (
    <div className={`${classes.root} ${open ? classes.card : ''}`}>
      {open && (
        <>
          <div className={classes.tags}>
            {localTags?.map((e) => (
              <Chip
                {...(!disableUpdate
                  ? {
                      onDelete: handleDelete(e),
                    }
                  : {})}
                size='small'
                className={classes.chip}
                label={e}
                key={e}
              />
            ))}
          </div>
          {!disableUpdate && (
            <>
              {showInput && (
                <Input
                  onChange={handleChange}
                  value={newTag}
                  type='text'
                  error={error}
                  ref={inputRef}
                  autoFocus
                />
              )}

              <Button
                variant='text'
                className={classes.button}
                onClick={showInput ? addTag : () => setShowInput(true)}
                disabled={disable}
                startIcon={<AddIcon />}
              >
                {showInput ? 'Add' : 'Add Tag'}
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Tags;
