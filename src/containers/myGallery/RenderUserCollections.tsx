import React, { useEffect, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import ImageCard from '../../components/ImageCard/ImageCard';
import { getImagesFromList } from '../../firebase/firestore/firestore';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      padding: '20px',
      width: 'calc(100% - 40px)',
      minHeight: '50px',

      alignItems: 'center',
      justifyContent: 'center',
    },
    card: {
      padding: '10px',
    },
  })
);

interface Col {
  name: string;
  url: string;
  docId: string;
}

const RenderUserCollections = ({ account, collections }: { account: string; collections: any }) => {
  const classes = useStyles();
  const [userCollections, setCollections] = useState<Col[]>([]);
  const history = useHistory();

  useEffect(() => {
    let mounted = true;
    if (!collections || collections.length === 0 || !mounted) return;

    const getCollectionsThumbs = async () => {
      const cols: Col[] = [];
      const promisi: Promise<any>[] = collections
        ?.filter((e: any) => Boolean(e?.images) && e.images?.length > 0)
        .map(async (e: { images: string; name: string; docId: string }) => {
          // Get image doc
          const doc = await getImagesFromList([e.images[0]]);

          const url = doc.images[0] ? doc.images[0].thumbUrl?.landscape : '';

          cols.push({
            name: e.name,
            url,
            docId: e.docId,
          });
        });

      await Promise.all(promisi);
      if (mounted) setCollections(cols.filter((e: Col) => Boolean(e.url)));
    };

    getCollectionsThumbs();

    return () => {
      mounted = false;
    };
  }, [collections]);

  const handleClick = (col: string) => () => {
    history.push(`/collection?account=${account}&collection=${col}`);
  };

  return userCollections.length > 0 ? (
    <div className={classes.root}>
      {userCollections.map((e) => (
        <ImageCard className={classes.card} key={e.url} url={e.url} title={e.name} size='small' onClick={handleClick(e.docId || '')} />
      ))}
    </div>
  ) : (
    <div />
  );
};

export default RenderUserCollections;
