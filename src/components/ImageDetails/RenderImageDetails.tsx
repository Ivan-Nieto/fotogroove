import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.grey[200],

    display: 'block',

    padding: '10px',
    borderRadius: '10px',
    textAlign: 'left',
  },
  title: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'left',
    paddingBottom: '10px',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.white,
  },
  item: {
    padding: '0px',
    maxWidth: 'calc(100% - 20px)',
    textDecoration: 'none',
    color: theme.palette.grey[400],

    overflowWrap: 'break-word',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const RenderImageDetails = ({ image, author, open }: { open: boolean; image?: Record<string, any>; author?: Record<string, any> }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [items, setItems]: any = useState([]);

  useEffect(() => {
    const notEmpty = (data?: Record<string, any>) => Object.keys(data || {}).length > 0;

    const newItems: string[] = [];

    if (notEmpty(image)) {
      // Add creation date
      try {
        if (image?.createDate) newItems.push(`Uploaded: ${image.createDate?.toDate().toLocaleDateString()}`);
      } catch (error) {}

      // Add view counter
      newItems.push(`Views: ${image?.views && image.views > 0 ? image.views : 1}`);
      newItems.push(`Favorites: ${image?.favorites || 0}`);

      // Add all metadata from image
      if (notEmpty(image?.metadata)) {
        Object.keys(image?.metadata).forEach((e) => {
          newItems.push(`${e}: ${image?.metadata[e]}`);
        });
      }
    }

    if (newItems.length > 0) setItems(newItems);
  }, [image, author, setItems]);

  return (
    <div className={open ? classes.root : ''}>
      {open && items.length > 0 && (
        <div>
          <Typography className={classes.title} variant='body1'>
            Details
          </Typography>
          {author && (
            <Typography variant='subtitle1' className={classes.item}>
              Author:{' '}
              <Link className={classes.link} to={`/gallery?account=${author?.id}`}>
                {author?.userName}
              </Link>
            </Typography>
          )}
          {items.map((e: string) => (
            <Typography key={e} variant='subtitle1' className={classes.item}>
              {e}
            </Typography>
          ))}
        </div>
      )}
    </div>
  );
};

export default RenderImageDetails;
