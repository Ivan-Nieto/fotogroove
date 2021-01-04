import React from "react";
import {
  makeStyles,
  createStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const CustomProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 7,
      borderRadius: 3,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[100],
    },
    bar: {
      borderRadius: 3,
      backgroundColor: theme.palette.common.white,
    },
  })
)(LinearProgress);

const LoadingBar = ({ progress }: { progress: number }) => {
  const classes = useStyles();

  return (
    <CustomProgress
      className={classes.root}
      variant="determinate"
      value={progress}
    />
  );
};

export default LoadingBar;
