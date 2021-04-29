import React from 'react';
import MuiSpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: 2,
    width: 'auto',
    height: 'auto',

    top: 'unset',
    bottom: '30px',
    margin: 'auto',
    left: '30px',
    right: '30px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
}));

export interface Action {
  name?: string;
  icon: any;
  onClick: () => void | undefined;
}

interface SpeedDialProps {
  actions: Action[];
  className?: string;
  hidden?: boolean;
}

const SpeedDial = ({ actions, className, hidden }: SpeedDialProps) => {
  const { root } = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={root}>
      <MuiSpeedDial
        className={className || ''}
        ariaLabel='SpeedDial'
        hidden={Boolean(hidden)}
        icon={<SpeedDialIcon color='inherit' openIcon={<EditIcon />} />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction='up'
      >
        {actions.map((action: Action, index: number) => (
          <SpeedDialAction key={`${action?.name}-${index}`} icon={action?.icon} tooltipTitle={action?.name} onClick={action?.onClick} />
        ))}
      </MuiSpeedDial>
    </div>
  );
};

export default SpeedDial;
