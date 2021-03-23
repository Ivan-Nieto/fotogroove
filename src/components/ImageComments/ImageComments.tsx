import React from 'react';
import firebase from 'firebase/app';
import { useTheme, Theme, makeStyles } from '@material-ui/core/styles';

import usePagination from '../../hooks/usePagination';
import useScroll from '../../hooks/useScroll';

import RenderAddComment from './RenderAddComment';
import RenderComment, { Comment } from './RenderComment';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 'calc(100% - 60px)',
    padding: '30px',

    justifyContent: 'center',
    alignContent: 'center',
  },
  addComment: {
    display: 'block',
    margin: 'auto',
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  comment: {
    display: 'block',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    color: theme.palette.grey[800],
    padding: '10px 30px',
    textAlign: 'center',
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
  const [comments, topHit] = usePagination(
    bottomHit,
    dbRef,
    ['date'],
    5,
    extractData
  );

  return (
    <div className={classes.root}>
      <div className={classes.addComment}>
        {user?.isSignedIn && <RenderAddComment user={user} imageId={imageId} />}
      </div>
      <div className={classes.divider} />
      <div className={classes.content}>
        {comments?.length === 0 && (
          <Typography className={classes.comment} variant='body1'>
            No Comments
          </Typography>
        )}
        {topHit && (
          <Typography className={classes.comment} variant='body1'>
            Reload to view new comments
          </Typography>
        )}
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
