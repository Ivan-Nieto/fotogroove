import React from 'react';
import firebase from 'firebase/app';
import { useTheme, Theme, makeStyles } from '@material-ui/core/styles';

import usePagination from '../../hooks/usePagination';
import useScroll from '../../hooks/useScroll';

import RenderAddComment from './RenderAddComment';
import RenderComment, { Comment } from './RenderComment';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 'calc(100% - 60px)',
    padding: '30px',
  },
  addComment: { width: '100%', justifyItems: 'center', alignItems: 'center' },
  content: {
    margin: 'auto',
    padding: 'auto',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  comment: {
    display: 'block',
    margin: 'auto',
    padding: '10px 30px',
  },
  divider: {
    width: '100%',
    height: '2px',
    margin: '20px',
    backgroundColor: theme.palette.grey[400],
  },
}));

const ImageComments = ({
  imageId,
  user,
}: {
  imageId: string;
  user?: Record<string, any>;
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const dbRef = firebase
    .firestore()
    .collection('comments')
    .where('contentType', '==', 'image')
    .where('contentId', '==', imageId)
    .orderBy('date', 'desc');

  const extractData = (docs: any) => {
    return docs.map((e: any) => ({ ...e.data(), docId: e.id }));
  };

  const bottomHit = useScroll();
  const [comments] = usePagination(bottomHit, dbRef, ['date'], 15, extractData);

  return (
    <div className={classes.root}>
      <div className={classes.addComment}>
        {user?.isSignedIn && <RenderAddComment user={user} imageId={imageId} />}
      </div>
      <div className={classes.divider} />
      <div className={classes.content}>
        {comments.map((e: Comment, index: number) => (
          <RenderComment
            className={classes.comment}
            key={`${e.docId}-${index}`}
            comment={e}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageComments;
