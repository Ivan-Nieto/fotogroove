import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import firebase from 'firebase/app';
import Typography from '@material-ui/core/Typography';

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
  },
  titleBarDate: {
    textAlign: 'right',
  },
  titleBarUser: {
    textAlign: 'left',
  },
}));

const RenderComment = ({
  comment,
  className,
}: {
  comment: Comment;
  className?: string;
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
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
    </div>
  );
};

export default RenderComment;
