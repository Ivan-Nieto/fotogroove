import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MuDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import clsx from 'clsx';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import useUser from '../../hooks/useUser';

import Tags from '../Tags/Tags';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: '100vh',
  },
  drawer: {
    width: '240px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: '240px',
    borderRight: `2px solid ${theme.palette.grey[800]}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    borderRight: `2px solid ${theme.palette.grey[800]}`,
    overflowX: 'hidden',
    width: theme.spacing(6) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  icon: {
    backgroundColor: theme.palette.grey[100],
  },
  close: {
    position: 'relative',
    bottom: '0%',
  },
}));

const Drawer = ({
  openByDefault = false,
  anchor = 'left',
  children,
  items,
  tags,
  image,
}: {
  items?: any;
  openByDefault?: boolean;
  image?: Record<string, any>;
  children?: any;
  anchor?: 'top' | 'right' | 'bottom' | 'left';
  tags?: string[];
}) => {
  const [open, setOpen] = useState(openByDefault);
  const [ownsImage, setOwnsImage] = useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);
  const user = useUser();

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setOpen(!open);
  };

  useEffect(() => {
    if (user?.isSignedIn && image?.author === user.uid) setOwnsImage(true);
    else setOwnsImage(false);
  }, [user, setOwnsImage, image]);

  return (
    <MuDrawer
      open={open}
      anchor={anchor}
      onClose={() => setOpen(false)}
      variant='permanent'
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <List className={classes.root}>
        <ListItem>
          <ListItemIcon>
            <LocalOfferIcon color='secondary' />
          </ListItemIcon>
          <ListItemText>Tags</ListItemText>
        </ListItem>
        <ListItem>
          <Tags
            tags={tags}
            docId={image?.docId}
            open={open}
            disableUpdate={!ownsImage}
          />
        </ListItem>
      </List>
      <ListItem
        onClick={toggleDrawer}
        button
        key='close-open'
        className={classes.icon}
      >
        <ListItemIcon>
          <KeyboardArrowRightIcon color='primary' />
        </ListItemIcon>
      </ListItem>
    </MuDrawer>
  );
};

export default Drawer;
