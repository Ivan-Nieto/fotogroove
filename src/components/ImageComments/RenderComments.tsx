import React from 'react';
import firebase from 'firebase/app';
import { useTheme, Theme, makeStyles } from '@material-ui/core/styles';

import usePagination from '../../hooks/usePagination';
import useScroll from '../../hooks/useScroll';

import RenderComment, { Comment } from './RenderComment';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
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
}));

const RenderComments = ({
  contentId,
  user,
  emptyMessage,
  reloadMessage,
}: {
  emptyMessage?: string;
  reloadMessage?: string;
  contentId: string;
  user?: Record<string, any>;
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const dbRef = firebase
    .firestore()
    .collection('comments')
    .where('contentType', '==', 'image')
    .where('threadId', '==', contentId)
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
    <div className={classes.content}>
      {comments?.length === 0 && (
        <Typography className={classes.comment} variant='body1'>
          {emptyMessage ? emptyMessage : 'No Comments'}
        </Typography>
      )}
      {topHit && (
        <Typography className={classes.comment} variant='body1'>
          {reloadMessage ? reloadMessage : 'Reload to view new comments'}
        </Typography>
      )}
      {comments.map((e: Comment, index: number) => (
        <RenderComment
          className={classes.comment}
          key={`${e.docId}-${index}`}
          comment={e}
          contentId={contentId}
          user={user}
        />
      ))}
    </div>
  );
};

export default RenderComments;
