import React from 'react';
import { useTheme, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import DisplayImage from '../DisplayImage/DisplayImage';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '600px',
    overflowX: 'hidden',
    padding: '30px 15px 50px 15px',
  },
  container: {
    overflowY: 'scroll',
    marginRight: '-50px',
    paddingRight: '50px',

    display: 'flex',
    flexWrap: 'wrap',
  },
  img: {
    padding: '10px',
    margin: 'auto',
    cursor: 'pointer',
  },
  message: {
    width: '100%',
    paddingTop: '200px',
    color: theme.palette.grey[400],
    textAlign: 'center',
  },
  scroll: {
    overflowY: 'scroll',
  },
}));

const RenderImageGallery = ({
  images,
  targetIsUser,
  onEmptyMessage = 'No Images Found',
}: {
  targetIsUser?: boolean;
  images: Array<any>;
  onEmptyMessage: string;
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      {images.length > 0 && (
        <div className={classes.container}>
          {images.map((img: any, index: number) => (
            <div key={`img${index}`} className={classes.img}>
              <DisplayImage ownsImage={Boolean(targetIsUser)} size='large' image={img} />
            </div>
          ))}
        </div>
      )}

      {images && images.length === 0 && (
        <div className={classes.message}>
          <Typography variant='body1' color='inherit'>
            {onEmptyMessage}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default RenderImageGallery;
