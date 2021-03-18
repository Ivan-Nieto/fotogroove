import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    borderRadius: '10px',
  },
  title: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'left',
    paddingBottom: '10px',
  },
  item: {
    padding: '0px',
    width: '100%',
    color: theme.palette.grey[400],

    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const RenderImageDetails = ({
  image,
  author,
  open,
}: {
  open: boolean;
  image?: Record<string, any>;
  author?: Record<string, any>;
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [items, setItems]: any = useState([]);

  useEffect(() => {
    const notEmpty = (data?: Record<string, any>) =>
      Object.keys(data || {}).length > 0;

    const newItems: string[] = [];
    if (notEmpty(author)) {
      newItems.push(`Author: ${author?.userName}`);
    }
    if (notEmpty(image)) {
      newItems.push(
        `Views: ${image?.views && image.views > 0 ? image.views : 1}`
      );

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
    <ListItem className={open ? classes.root : ''}>
      {open && items.length > 0 && (
        <div>
          <Typography className={classes.title} variant='body1'>
            Details
          </Typography>
          {items.map((e: string) => (
            <Typography key={e} variant='subtitle1' className={classes.item}>
              {e}
            </Typography>
          ))}
        </div>
      )}
    </ListItem>
  );
};

export default RenderImageDetails;
