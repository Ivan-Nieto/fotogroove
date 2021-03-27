import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';

import Spoke from './Spoke';

const useStyles = makeStyles((theme: Theme) => ({
  select: {
    maxWidth: '250px',
    maxHeight: '250px',
    height: '100%',
    width: '100%',

    padding: '10px',
  },
  selectText: {
    textTransform: 'none',
    border: 'none',
    width: '100%',
    fontSize: '32px',
    fontStyle: 'oblique 20deg',
    color: theme.palette.secondary.main,
    textShadow: `0px 0px 30px ${theme.palette.common.white},0px 0px 30px ${theme.palette.common.white},0px 0px 10px ${theme.palette.common.white}`,
    '&:hover': {
      color: 'white',
      textShadow: '0px 0px 30px white,0px 0px 30px white,0px 0px 10px white',
    },
  },
  disabledText: {
    textTransform: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: theme.palette.grey[400],
  },
}));

const SelectionWheel = ({
  options,
  activeOption,
  setActiveOption,
}: {
  options: string[];
  activeOption: number;
  setActiveOption: any;
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const getPrevious = () =>
    activeOption - 1 < 0 ? options.length - 1 : activeOption - 1;

  const getNext = () =>
    activeOption + 1 >= options.length ? 0 : activeOption + 1;

  const [prevActive, setPrevActive] = useState(activeOption);
  const [prevOption, setPrevOption] = useState<number>(getPrevious());
  const [nextOption, setNextOption] = useState<number>(getNext());
  const [movingForward, setMovingForward] = useState<boolean>(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Find out if animation should play forward or backward
    if (activeOption === 0) {
      setMovingForward(prevActive !== 1);
    } else if (activeOption === options.length - 1) {
      setMovingForward(prevActive !== 0);
    } else setMovingForward(prevActive < activeOption);

    setNextOption(getNext());
    setPrevOption(getPrevious());
    setAnimate(activeOption !== prevActive);
    setPrevActive(activeOption);
    // eslint-disable-next-line
  }, [activeOption]);

  return (
    <div className={classes.select}>
      <Spoke
        animate={Boolean(animate)}
        text={
          prevOption == null ? options[options.length - 1] : options[prevOption]
        }
        direction={!movingForward ? 'top' : 'reverseTop'}
        onClick={() => setActiveOption(getPrevious())}
        activeOption={activeOption}
        className={classes.disabledText}
      />

      <Spoke
        animate={Boolean(animate)}
        text={options[activeOption || 0]}
        activeOption={activeOption}
        className={classes.selectText}
        direction={!movingForward ? 'center' : 'reverseCenter'}
      />

      <Spoke
        animate={Boolean(animate)}
        text={options[nextOption == null ? 1 : nextOption]}
        activeOption={activeOption}
        direction={!movingForward ? 'bottom' : 'reverseBottom'}
        onClick={() => setActiveOption(getNext())}
        className={classes.disabledText}
      />
    </div>
  );
};

export default SelectionWheel;
