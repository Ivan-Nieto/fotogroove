import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Input from '../Input/Input';

interface Props {
  label: string;
  options: Record<string | 'label', any>[];
  className?: string;
  value: string;
  onChange: (event: any, newValue?: any) => void | undefined;
}

const Search = (props: Props) => {
  return (
    <Autocomplete
      id='search-box'
      inputValue={props.value || ''}
      className={props?.className || ''}
      options={props.options}
      onChange={props.onChange}
      getOptionLabel={(option) => option.label}
      renderInput={(params: any) => (
        <Input {...params} label={props.label} variant='outlined' />
      )}
    />
  );
};

export default Search;
