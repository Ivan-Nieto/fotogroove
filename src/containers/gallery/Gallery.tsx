import React, { useEffect, useState } from 'react';
import { useTheme, Theme, makeStyles } from '@material-ui/core/styles';

import useQuery from '../../hooks/useQuery';
import useUser from '../../hooks/useUser';
import useScroll from '../../hooks/useScroll';

import DisplayImage from '../../components/DisplayImage/DisplayImage';
import { getUsersImages } from '../../firebase/firestore/firestore';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '600px',
    overflowX: 'hidden',
    padding: '30px 30px 0px 30px',
  },
  container: {
    overflowY: 'scroll',
    marginRight: '-50px',
    paddingRight: '50px',

    display: 'flex',
    flexWrap: 'wrap',
  },
  img: {
    padding: '10px',
    margin: 'auto',
    cursor: 'pointer',
  },
  message: {
    width: '100%',
    paddingTop: '200px',
    color: theme.palette.grey[400],
    textAlign: 'center',
  },
  scroll: {
    overflowY: 'scroll',
  },
}));

const Gallery = ({ targetAccount }: { targetAccount?: string }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const query = useQuery();
  const user = useUser();
  const bottomHit = useScroll();

  const [images, setImages]: any = useState(false);
  const [account, setAccount] = useState('');
  const [lastEntry, setLastEntry]: any = useState(false);
  const [paginating, setPaginating] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [targetIsUser, setTargetIsUser] = useState(false);

  useEffect(() => {
    let mounted = true;
    const update = async () => {
      if (bottomHit !== 0 && !paginating && !endReached && mounted) {
        setPaginating(true);
        // Get new set of images
        const newImgs = await getUsersImages(account, lastEntry);

        if (!mounted) return;

        // Add new images to current set
        const newImages = images.concat(newImgs.images || []);
        setImages(newImages);

        // Decide weather or not this is the end of the list
        const newLastEntry = newImgs.images
          ? newImgs.images[newImgs?.images?.length - 1]
          : false;
        if (lastEntry && (!newLastEntry || newLastEntry.id === lastEntry.id)) {
          setEndReached(true);
        } else setLastEntry(newLastEntry);

        setPaginating(false);
      }
    };

    update();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bottomHit]);

  useEffect(() => {
    let mounted = true;

    const getImages = async () => {
      setPaginating(true);
      const images = await getUsersImages(account);
      if (mounted) {
        setImages(images?.images || []);
        if (images?.images)
          setLastEntry(images?.images[images?.images?.length - 1]);
        setPaginating(false);
      }
    };
    if (account !== '' && !paginating) getImages();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line
  }, [account]);

  useEffect(() => {
    // If account was already set abort
    if (account !== '') return;

    // Get images from appropriate account
    const urlParam = query.get('user');
    // From url parameter
    if (urlParam) setAccount(urlParam);
    // From prop
    else if (targetAccount) setAccount(targetAccount);
    // From current signed in account
    else if (user?.isSignedIn) {
      setTargetIsUser(true);
      setAccount(user?.uid || '');
    }
    // eslint-disable-next-line
  }, [user]);

  const handleClick = (img: string) => () => {
    const win = window.open(`/view-image?url=${img}`);
    win?.focus();
  };

  return (
    <div className={classes.root}>
      {images.length > 0 && (
        <div className={classes.container}>
          {images.map((img: any, index: number) => (
            <div
              key={`img${index}`}
              className={classes.img}
              onClick={handleClick(img?.url)}
            >
              <DisplayImage size='large' image={img} />
            </div>
          ))}
        </div>
      )}

      {images && images.length === 0 && (
        <div className={classes.message}>
          <Typography variant='body1' color='inherit'>
            {targetIsUser
              ? `You haven't uploaded any images yet. You can upload your images by selecting "Upload" from the profile dropdown. Any images you upload will show up here.`
              : `This user hasn't uploaded any images.`}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Gallery;
