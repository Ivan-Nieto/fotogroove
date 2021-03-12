import React, { useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MuDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';

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
}: {
  items?: any;
  openByDefault?: boolean;
  children?: any;
  anchor?: 'top' | 'right' | 'bottom' | 'left';
}) => {
  const [open, setOpen] = useState(openByDefault);
  const theme = useTheme();
  const classes = useStyles(theme);

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

  return (
    <MuDrawer
      open={open}
      anchor={anchor}
      onClose={() => setOpen(false)}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
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
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? (
                <InboxIcon color='primary' />
              ) : (
                <MailIcon color='primary' />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <ListItem
        onClick={toggleDrawer}
        button
        key='close-open'
        className={classes.icon}
      >
        <ListItemIcon>
          <InboxIcon color='primary' />
        </ListItemIcon>
      </ListItem>
    </MuDrawer>
  );
};

export default Drawer;
