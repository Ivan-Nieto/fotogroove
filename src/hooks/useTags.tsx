import { useState, useEffect } from 'react';

import { useFormContext } from '../context/Context';

const useTags = () => {
  const [tags, setTags] = useState<{ label: string; count: number }[]>([]);
  const { state } = useFormContext();

  useEffect(() => {
    setTags(state?.tags || []);
  }, [state]);

  return tags;
};

export default useTags;
