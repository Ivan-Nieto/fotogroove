import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import useUser from '../../hooks/useUser';
import useQuery from '../../hooks/useQuery';

import Gallery from '../gallery/Gallery';
import Carousel from '../../components/Carousel/Carousel';
import { getImagesFromList, getDownloadURL, getUserFavorites } from '../../firebase/firestore/firestore';

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
  const query = useQuery();
  const [featured, setFeatured] = useState<{ id?: string; src: string }[]>([]);
  const [querying, setQuerying] = useState(false);
  const [account, setAccount] = useState<undefined | string>();
  const ref = React.useRef<any>(null);

  // Set querying to false after 3 seconds
  useEffect(() => {
    if (querying)
      ref.current = setTimeout(() => {
        setQuerying(false);
      }, 3000);
    else if (ref?.current) clearTimeout(ref.current);

    return () => {
      if (ref?.current) clearTimeout(ref.current);
    };
  }, [querying]);

  useEffect(() => {
    let mount = true;
    const acc = (query.get('account') as string) || '';
    if (!Boolean(account)) {
      if (Boolean(acc)) setAccount(acc);

      if (!Boolean(user?.isSignedIn) || user?.userDoc?.featured?.length === 0) return;

      if (!Boolean(acc)) setAccount(user?.uid);
    }

    const getImgs = async () => {
      setQuerying(true);

      // If account belongs to another user query for favorites
      let targetFeatured = [];
      if (Boolean(acc)) targetFeatured = await getUserFavorites(acc);
      else targetFeatured = user?.userDoc?.featured || [];

      if (!mount || targetFeatured.length === 0) {
        if (mount) setQuerying(false);
        return;
      }

      const { images } = await getImagesFromList(targetFeatured, true);

      if (!mount || images?.length === 0) {
        if (mount) setQuerying(false);
        return;
      }

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
        if (user?.uid && !Boolean(acc)) {
          params?.append('account', user?.uid);
          history.push({ search: params.toString() });
        }
      }

      if (mount) setQuerying(false);
    };

    if (!querying || featured.length > 0) getImgs();
    return () => {
      mount = false;
    };
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className={root}>
      {Boolean(account) && !querying && (
        <>
          {featured.length > 0 && <Carousel images={featured} />}
          {account && Boolean(account) && <Gallery targetAccount={account} />}
        </>
      )}
    </div>
  );
};

export default MyGallery;
