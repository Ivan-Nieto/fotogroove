import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Divider from '@material-ui/core/Divider';

import useUser from '../../hooks/useUser';

import Tags from '../Tags/Tags';
import Drawer from '../Drawer/Drawer';
import RenderDescription from './RenderDescription';
import RenderImageDetails from './RenderImageDetails';
import RenderFavorite from './RenderFavorite';
import RenderCollectionSelect from './RenderCollectionSelect';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: '100vh',
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
}));

const ImageDetails = ({
  tags,
  image,
  author,
}: {
  author: Record<string, any>;
  image?: Record<string, any>;
  tags?: string[];
}) => {
  const [ownsImage, setOwnsImage] = useState(true);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);
  const user = useUser();
  const hasRez = Boolean(image?.resolution?.height && image?.resolution?.width);

  useEffect(() => {
    if (user?.isSignedIn && image?.author === user.uid) setOwnsImage(true);
    else setOwnsImage(false);
  }, [user, setOwnsImage, image]);

  return (
    <Drawer open={open} setOpen={setOpen} openByDefault={false} anchor='left'>
      <List className={classes.root}>
        {hasRez && (
          <ListItem>
            <ListItemIcon></ListItemIcon>
            <ListItemText>
              {image?.resolution?.width} x {image?.resolution?.height}
            </ListItemText>
          </ListItem>
        )}
        {user?.isSignedIn && open && (
          <ListItem className={classes.item}>
            <RenderFavorite user={user} image={image} />
          </ListItem>
        )}

        <Divider className={classes.divider} />
        {user?.isSignedIn && open && (
          <ListItem className={classes.item}>
            <RenderCollectionSelect image={image} />
          </ListItem>
        )}

        <ListItem>
          <ListItemIcon>
            <LocalOfferIcon color='secondary' />
          </ListItemIcon>
          <ListItemText>Tags</ListItemText>
        </ListItem>

        <ListItem className={classes.item}>
          <Tags
            tags={tags}
            docId={image?.docId}
            open={open}
            disableUpdate={!ownsImage}
          />
        </ListItem>

        <ListItem className={classes.item}>
          <RenderImageDetails image={image} author={author} open={open} />
        </ListItem>

        {image?.description !== null && (
          <RenderDescription open={open} image={image} ownsImage={ownsImage} />
        )}
      </List>
    </Drawer>
  );
};

export default ImageDetails;
