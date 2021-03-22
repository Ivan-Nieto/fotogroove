import React, { useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';

import Drawer from '../../components/Drawer/Drawer';
import RenderAddCollection from './RenderAddCollection';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: '100vh',
    paddingTop: '70px',
  },
  icon: {
    backgroundColor: theme.palette.grey[100],
  },
  item: {
    padding: '20px 10px',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  divider: {
    backgroundColor: theme.palette.grey[400],
  },
  title: { textAlign: 'center' },
}));

const RenderCollectionButtons = ({
  collections,
  uid,
  addCollection,
}: {
  addCollection: any;
  uid: string;
  collections: { name: string; onClick: () => void | undefined }[];
}) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Drawer open={open} setOpen={setOpen} openByDefault={false} anchor='left'>
      <List className={classes.root}>
        <ListItem className={classes.item}>
          <Typography variant='h5' className={classes.title}>
            {open ? 'My Collections' : ''}
          </Typography>
        </ListItem>
        <Divider className={classes.divider} />
        {collections.map(
          (
            e: { name: string; onClick: () => void | undefined },
            index: number
          ) => (
            <ListItem button key={`${e.name}-${index}`} onClick={e.onClick}>
              <ListItemIcon>
                <CollectionsBookmarkIcon color='secondary' />
              </ListItemIcon>
              <ListItemText>{e.name}</ListItemText>
            </ListItem>
          )
        )}
        <RenderAddCollection
          addCollection={addCollection}
          uid={uid}
          open={open}
        />
      </List>
    </Drawer>
  );
};

export default RenderCollectionButtons;