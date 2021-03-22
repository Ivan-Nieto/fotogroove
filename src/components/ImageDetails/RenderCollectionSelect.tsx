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

import { addRemoveImageFromCollections } from '../../firebase/firestore/collections';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: '5px',
      backgroundColor: theme.palette.grey[200],
      padding: '5px',
      justifyItems: 'center',
      alignItems: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
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
    active: {
      fontWeight: theme.typography.fontWeightBold,
    },
    input: {
      width: '150px',
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
  const [activeCollections, setActiveCollections]: [Image[], any] = useState(
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

  const handleChange = async (event: React.ChangeEvent<{ value: unknown }>) => {
    setDisabled(true);

    const newCollections: string[] = (event.target.value as string[]) || [];
    const value = newCollections[newCollections.length - 1];

    const alreadyInArr =
      activeCollections.filter((e) => e.docId === value).length > 0;

    const removeFromCollections = alreadyInArr ? [value] : [];
    const addToCollections = !alreadyInArr ? [value] : [];

    // Create new collection
    let updatedCollections = [];
    if (alreadyInArr) {
      updatedCollections = activeCollections.filter((e) => e.docId !== value);
    } else {
      updatedCollections = activeCollections.concat([
        collections.filter((e) => e.docId === value)[0],
      ]);
    }

    setActiveCollections(updatedCollections);

    // Update firestore
    if (
      user?.uid &&
      image?.docId &&
      (removeFromCollections.length > 0 || addToCollections.length > 0)
    ) {
      await addRemoveImageFromCollections(user.uid, image?.docId || '', {
        addToCollections,
        removeFromCollections,
      });
    }

    setDisabled(false);
  };

  const getClass = (img: Image) => {
    if (activeCollections.filter((e) => e.docId === img.docId).length > 0)
      return classes.active;
    return '';
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel id='collection-select-label'>Add To Collection</InputLabel>
        <Select
          labelId='collection-select-label'
          id='collection-select'
          multiple
          disabled={disabled}
          value={activeCollections}
          onChange={handleChange}
          input={
            <Input id='collection-render-input' className={classes.input} />
          }
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
          {collections.map((img: any) => (
            <MenuItem
              key={img.docId}
              value={img.docId}
              className={getClass(img)}
            >
              {img.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default RenderCollectionSelect;
