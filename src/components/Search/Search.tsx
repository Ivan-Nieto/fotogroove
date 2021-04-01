import React from 'react';
import {
  makeStyles,
  withStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import MuPaper from '@material-ui/core/Paper';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Input from '../Input/Input';

const useStyles = makeStyles(() => ({
  root: {
    width: '280px',
  },
}));

const Paper = withStyles((theme: Theme) => ({
  root: {
    backgroundColor: 'rgba(37, 40, 43, 0.8)',
    borderRadius: '10px',
    backdropFilter: 'blur(20px)',
    color: theme.palette.common.white,

    '& ::-webkit-scrollbar': {
      width: '10px',
    },

    '& ::-webkit-scrollbar-track': {
      backgroundColor: '#414345',
    },

    '& ::-webkit-scrollbar-thumb': {
      background: 'linear-gradient(to right, #141e30, #243b55)',
      outline: '1px solid #414345',
    },
  },
}))(MuPaper);

interface Props {
  label: string;
  options: Record<string | 'label', any>[];
  className?: string;
  value: string;
  onChange: (event: any, newValue?: any) => void | undefined;
}

const Search = (props: Props) => {
  useTheme();
  const { root } = useStyles();
  return (
    <Autocomplete
      id='search-box'
      limitTags={10}
      className={`${root} ${props?.className || ''}`}
      options={props.options}
      onChange={props.onChange}
      getOptionLabel={(option) => option.label}
      PaperComponent={Paper}
      renderInput={(params: any) => (
        <Input {...params} label={props.label} variant='outlined' />
      )}
    />
  );
};

export default Search;
