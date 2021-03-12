import React, { useEffect, useState } from 'react';
import { useTheme, Theme, makeStyles } from '@material-ui/core/styles';

import useQuery from '../../hooks/useQuery';

import { getDownloadURL } from '../../firebase/firestore/firestore';
import Drawer from '../../components/Drawer/Drawer';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: '100%',
    padding: '30px',
    display: 'block',
  },
  container: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: '10px',
    display: 'flex',
    padding: '20px 0px',
  },
  img: {
    margin: 'auto',
    padding: 'auto',
    maxWidth: 'calc(100vw - 100px)',
    maxHeight: 'calc(100vh - 100px)',
    height: 'auto',
  },
}));

const ViewImage = ({ imageLocation }: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [url, setURL] = useState('');
  const query = useQuery();

  useEffect(() => {
    const getURL = async () => {
      const paramUrl = query.get('url');
      setURL(await getDownloadURL(paramUrl || imageLocation || ''));
    };
    getURL();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <Drawer openByDefault={true} />
      <div className={classes.container}>
        <img src={url} alt={''} className={classes.img} />
      </div>
    </div>
  );
};

export default ViewImage;
