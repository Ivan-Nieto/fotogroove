import React from 'react';
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

const RenderComment = ({
  comment,
  className,
}: {
  comment: Comment;
  className?: string;
}) => {
  return (
    <div className={className || ''}>
      <Typography key={`${comment.docId}-${Math.random()}`} variant='body1'>
        {comment.authorUserName} - {comment.comment}
      </Typography>
    </div>
  );
};

export default RenderComment;
