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

interface Image {
  images: string[];
  docId: string;
  name: string;
}

const RenderCollectionSelect = ({ image }: { image?: Record<string, any> }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const user = useUser();

  const [disabled, setDisabled] = useState(false);
  const [collections, setCollections]: [Image[], any] = useState([]);
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

    const currCollections: Image[] =
      user?.collections?.filter((e: Image) => e.name !== 'Favorites') || [];
    const imageId = image?.docId || '';

    const belongsTo: Image[] =
      currCollections.filter((e: Image) => e.images?.includes(imageId)) || [];

    setCollections(currCollections);
    setActiveCollections(belongsTo);

    if (currCollections.length === 0) {
      setDisabled(true);
    }
  }, [user, image]);

  const getNameOfCol = (id: string) => {
    return collections.filter((e: Image) => e.docId === id)[0] || {};
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setDisabled(true);

    const newCollections: string[] = (event.target.value as string[]) || [];
    const removedCollections = activeCollections.filter(
      (e) => !newCollections.includes(e)
    );

    const addedCollections = newCollections.filter(
      (e) => !activeCollections.includes(e)
    );

    setActiveCollections(
      newCollections.filter((e) => Boolean(e)).map((e) => getNameOfCol(e)) || []
    );

    // TODO: Update firestore

    setDisabled(false);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-multiple-chip-label'>Add To Collection</InputLabel>
        <Select
          labelId='demo-multiple-chip-label'
          id='demo-multiple-chip'
          multiple
          disabled={disabled}
          value={activeCollections}
          onChange={handleChange}
          input={<Input id='collection-render-input' />}
          renderValue={(selected: any) => (
            <div className={classes.chips}>
              {selected.map((value: any, index: number) => (
                <Chip
                  key={`chip-${value.docId}-${index}`}
                  label={value.name}
                  className={classes.chip}
                />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {collections.map((img: any, index: number) => (
            <MenuItem key={`${img.name} ${index}`} value={img.docId}>
              {img.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default RenderCollectionSelect;
