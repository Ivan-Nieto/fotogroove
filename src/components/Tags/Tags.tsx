import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import Button from '../Button/Button';

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
}: {
  docId?: string;
  tags?: string[];
  open?: boolean;
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const addTag = async () => {
    const response = await firestore
      .collection('images')
      .doc(docId)
      .update({
        tags: tags?.concat(['Doc3']),
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={`${classes.root} ${open ? classes.card : ''}`}>
      {open && (
        <>
          <div className={classes.tags}>
            {tags?.map((e) => (
              <Chip size='small' className={classes.chip} label={e} key={e} />
            ))}
          </div>
          <Button
            variant='text'
            className={classes.button}
            onClick={addTag}
            startIcon={<AddIcon />}
          >
            Add Tag
          </Button>
        </>
      )}
    </div>
  );
};

export default Tags;
