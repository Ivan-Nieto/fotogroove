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
    maxWidth: 'calc(100vw - 60px)',
    maxHeight: 'calc(100vh - 60px)',
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
      const paramUrl = query.get('url');
      setURL(await getDownloadURL(paramUrl || imageLocation || ''));
      const imgDoc = await firestore
        .collection('images')
        .where('url', '==', paramUrl || imageLocation || '')
        .get()
        .catch();

      if (!imgDoc.empty && mounted) {
        const docData = imgDoc.docs[0].data();
        setImage({
          ...docData,
          docId: imgDoc.docs[0].id,
        });

        if (docData?.author)
          await firestore
            .collection('users')
            .doc(docData?.author)
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

    if (image?.docId && image?.author !== user?.uid)
      updateViewCounter(image?.docId).catch(console.error);
  }, [image, user, viewed, setViewed]);

  return (
    <div className={classes.root}>
      <ImageDetails tags={image?.tags} image={image} author={author} />
      <div className={classes.container}>
        <img src={url} alt={''} className={classes.img} />
      </div>
      <div>
        {image?.docId && <ImageComments user={user} imageId={image?.docId} />}
      </div>
    </div>
  );
};

export default ViewImage;
