import React, { useEffect, useState } from 'react';
import { firestore } from '../../firebase/init';
import { useTheme, Theme, makeStyles } from '@material-ui/core/styles';

import useQuery from '../../hooks/useQuery';
import useUser from '../../hooks/useUser';

import { functions } from '../../firebase/init';
import { getDownloadURL } from '../../firebase/firestore/firestore';
import ImageDetails from '../../components/ImageDetails/ImageDetails';
import ImageComments from '../../components/ImageComments/ImageComments';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginLeft: '50px',
    padding: '15px',
  },
  container: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: '10px',
    display: 'flex',
  },
  img: {
    margin: 'auto',
    padding: 'auto',
    maxWidth: 'calc(100vw - 80px)',
    maxHeight: 'calc(100vh - 80px)',
    height: '100%',
  },
}));

const ViewImage = ({ imageLocation }: any) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [url, setURL] = useState('');
  const [image, setImage]: any = useState({});
  const [viewed, setViewed] = useState(false);
  const [author, setAuthor] = useState({});
  const user = useUser();
  const query = useQuery();

  useEffect(() => {
    let mounted = true;
    const getURL = async () => {
      const imageId = query.get('id') as string;
      if (!Boolean(imageId)) return;
      const imgDoc: any = await firestore
        .collection('images')
        .doc(imageId)
        .get()
        .catch(() => ({ empty: true }));

      if (imgDoc.empty) return;

      const imgData = imgDoc.data() || {};

      if (mounted) setURL(await getDownloadURL(imgData?.url));

      if (!imgDoc.empty && mounted) {
        setImage({
          ...imgData,
          docId: imgDoc?.id,
        });

        if (imgData?.author)
          await firestore
            .collection('users')
            .doc(imgData?.author)
            .get()
            .then((response) => {
              if (!mounted) return;
              const data = response?.data() || {};
              setAuthor({ ...data });
            })
            .catch();
      }

      return () => {
        mounted = false;
      };
    };

    getURL();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (viewed || user.isSignedIn == null || image?.author == null) return;
    setViewed(true);
    const updateViewCounter = functions.httpsCallable('updateViewCounter');

    if (image?.docId && image?.author !== user?.uid) updateViewCounter(image?.docId).catch(console.error);
  }, [image, user, viewed, setViewed]);

  return (
    <>
      <div className={classes.root}>
        <ImageDetails tags={image?.tags} image={image} author={author} />
        <div className={classes.container}>
          <img src={url} alt={''} className={classes.img} />
        </div>
      </div>
      <div className={classes.img}>{image?.docId && <ImageComments user={user || {}} imageId={image?.docId} />}</div>
    </>
  );
};

export default ViewImage;
