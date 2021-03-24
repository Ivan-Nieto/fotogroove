import React, { useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import Typography from '@material-ui/core/Typography';

import Button from '../Button/Button';
import RenderAddComment from './RenderAddComment';
import RenderComments from './RenderComments';
export interface Comment {
  author: string;
  authorUserName: string;
  comment: string;
  commentHistory: string[];
  contentId: string;
  contentType: string;
  date: any;
  docId: string;
  likes: number;
  threadId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    borderRadius: '5px',
    padding: '10px',
    margin: '10px',
    minHeight: '150px',
    maxWidth: '500px',
  },
  titleBar: {
    width: '100%',
    padding: '10px 0px',
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  comment: {
    width: '100%',
    padding: '10px',
    textAlign: 'left',
  },
  titleBarDate: {
    textAlign: 'right',
  },
  titleBarUser: {
    textAlign: 'left',
  },
  actions: {
    width: '100%',
    textAlign: 'right',
    padding: '0px 10px',
  },
  button: {
    margin: '0px 5px',
  },
}));

const RenderComment = ({
  comment,
  className,
  user,
  contentId,
}: {
  contentId: string;
  user?: Record<string, any>;
  comment: Comment;
  className?: string;
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [showReply, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const date = new firebase.firestore.Timestamp(
    comment.date?.seconds,
    comment.date?.nanoseconds
  )
    .toDate()
    .toLocaleDateString();

  return (
    <div className={`${className || ''} ${classes.root}`}>
      <div className={classes.titleBar}>
        <Typography className={classes.titleBarUser} variant='body1'>
          {comment.authorUserName} - [{date}]
        </Typography>
      </div>
      <div className={classes.comment}>
        <Typography variant='body1'>{comment.comment}</Typography>
      </div>
      <div className={classes.actions}>
        {user?.isSignedIn && (
          <Button
            onClick={() => {
              setShowReply(!showReply);
              setShowReplies(true);
            }}
            variant='text'
            size='small'
            className={classes.button}
          >
            Reply
          </Button>
        )}
        <Button
          onClick={() => {
            setShowReplies(!showReplies);
          }}
          variant='text'
          size='small'
          className={classes.button}
        >
          Show Replies
        </Button>
      </div>

      {showReply && user?.isSignedIn && (
        <RenderAddComment
          user={user}
          contentId={contentId}
          threadId={comment.docId}
        />
      )}
      {(showReplies || showReply) && (
        <div>
          <RenderComments
            emptyMessage='No replies'
            reloadMessage='Reload to view new replies'
            user={user}
            contentId={comment.docId}
          />
        </div>
      )}
    </div>
  );
};

export default RenderComment;
