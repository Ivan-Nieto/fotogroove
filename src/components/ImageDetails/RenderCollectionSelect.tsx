import React, { useState, useEffect } from 'react';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';

import useUser from '../../hooks/useUser';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const RenderCollectionSelect = ({ image }: { image?: Record<string, any> }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const user = useUser();

  const [collections, setCollections]: [string[], any] = useState([]);
  const [activeCollections, setActiveCollections]: [string[], any] = useState(
    []
  );

  useEffect(() => {
    if (
      !user.isSignedIn ||
      !user.collections ||
      user.collections?.length === 0 ||
      !image ||
      !image.docId
    )
      return;

    // Find out what collections this image belongs too
    interface Image {
      images: string[];
      name: string;
    }
    const currCollections: Image[] =
      user?.collections?.filter((e: Image) => e.name !== 'Favorites') || [];
    const imageId = image?.docId || '';

    const belongsTo: Image[] =
      currCollections.filter((e: Image) => e.images?.includes(imageId)) || [];

    setCollections(currCollections.map((e: Image) => e.name));
    setActiveCollections(belongsTo.map((e: Image) => e.name));
  }, [user, image]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log(event.target.value as string[]);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-multiple-chip-label'>Add To Collection</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          value={activeCollections}
          onChange={handleChange}
          input={<Input id='collection-render-input' />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value, index) => (
                <Chip
                  key={`${value} ${index}`}
                  label={value}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {collections.map((name, index) => (
            <MenuItem key={`${name} ${index}`} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default RenderCollectionSelect;
