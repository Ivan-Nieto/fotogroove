import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 0,
    flexFlow: 'column',
    display: 'flex',

    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',

    padding: '16px',
    width: 'calc(100% - 32px)',

    borderTop: `1px solid ${theme.palette.grey[800]}`,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.grey[400],
  },
  text: {
    color: theme.palette.grey[400],
  },
}));

const Footer = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <Typography variant='subtitle1' className={classes.text}>
        Icons made by{' '}
        <a
          href='https://www.freepik.com'
          className={classes.link}
          title='Good Ware'
        >
          Good Ware
        </a>{' '}
        from{' '}
        <a
          href='https://www.flaticon.com/'
          className={classes.link}
          title='Flaticon'
        >
          www.flaticon.com
        </a>
      </Typography>
    </div>
  );
};

export default Footer;
