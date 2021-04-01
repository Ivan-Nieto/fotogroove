import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import useTags from '../../hooks/useTags';

import Search from '../Search/Search';

const useStyles = makeStyles(() => ({
  root: {
    padding: '15px',
    width: '250px',
  },
}));

const TagSearchField = () => {
  const [value, setValue] = useState('');
  const tags = useTags();
  const history = useHistory();
  const { root } = useStyles();

  const onChange = (event: any, newValue?: { label: string }) => {
    if (event?.target?.value) setValue(event.target.value);
    if (newValue?.label) {
      history.push(`/search?tag=${newValue?.label}`);
    }
  };

  return (
    <Search
      className={root}
      value={value}
      onChange={onChange}
      options={tags.filter((e) => e.count > 0)}
      label='Search by tag'
    />
  );
};

export default TagSearchField;
