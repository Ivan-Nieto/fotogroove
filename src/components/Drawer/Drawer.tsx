import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MuDrawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 'auto',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  toggleIcon: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingTop: '30px',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: theme.palette.grey[100],
  },
  drawerOpen: {
    width: 'auto',
    borderRight: `2px solid ${theme.palette.grey[800]}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    '&::-webkit-scrollbar': { display: 'none', width: '0px' },
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
}));

const Drawer = ({
  anchor = 'left',
  children,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
  openByDefault?: boolean;
  image?: Record<string, any>;
  children?: any;
  anchor?: 'top' | 'right' | 'bottom' | 'left';
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setOpen(!open);
  };

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
      {children}
      <div className={classes.toggleIcon}>
        <IconButton onClick={toggleDrawer}>{open ? <ChevronLeftIcon color='secondary' /> : <ChevronRightIcon color='secondary' />}</IconButton>
      </div>
    </MuDrawer>
  );
};

export default Drawer;
