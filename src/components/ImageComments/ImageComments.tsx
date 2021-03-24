import React from 'react';
import { useTheme, Theme, makeStyles } from '@material-ui/core/styles';

import RenderAddComment from './RenderAddComment';
import RenderComments from './RenderComments';

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
  user: Record<string, any>;
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <div className={classes.addComment}>
        <RenderAddComment user={user} contentId={imageId} threadId={imageId} />
      </div>
      <div className={classes.divider} />
      <RenderComments contentId={imageId} user={user} />
    </div>
  );
};

export default ImageComments;
