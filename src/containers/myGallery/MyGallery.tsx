import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import useUser from '../../hooks/useUser';

import Gallery from '../gallery/Gallery';
import Carousel from '../../components/Carousel/Carousel';
import { getImagesFromList, getDownloadURL } from '../../firebase/firestore/firestore';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '50px',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const MyGallery = () => {
  const user = useUser();
  const { root } = useStyles();
  const history = useHistory();
  const [featured, setFeatured] = useState<{ id?: string; src: string }[]>([]);
  const [querying, setQuerying] = useState(false);

  useEffect(() => {
    let mount = true;

    if (!Boolean(user?.isSignedIn) || user?.userDoc?.featured?.length === 0) return;

    const getImgs = async () => {
      setQuerying(true);
      const { images } = await getImagesFromList(user?.userDoc?.featured || [], true);

      if (!mount || images?.length === 0) return;

      interface ImgReturn {
        src: string;
        id?: string;
      }
      const promisi =
        images?.map(
          async (e: any): Promise<ImgReturn> => {
            const src = await getDownloadURL(e?.url);
            return {
              src,
              id: e?.id,
            };
          }
        ) || [];

      const imgs: Array<ImgReturn> = await Promise.all(promisi);

      if (mount && imgs) {
        setFeatured(imgs.filter((e: ImgReturn) => Boolean(e?.src)) || []);
        const params = new URLSearchParams();
        if (user?.uid) {
          params?.append('account', user?.uid);
          history.push({ search: params.toString() });
        }
      }
    };

    if (!querying) getImgs();
    return () => {
      mount = false;
    };
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className={root}>
      {featured.length > 0 && <Carousel images={featured} />}
      <Gallery targetAccount={user?.uid} />;
    </div>
  );
};

export default MyGallery;
