import React from "react";
import { useTheme, Theme, makeStyles } from "@material-ui/core/styles";

import DisplayImage from "../../components/DisplayImage/DisplayImage";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flex: 1,
    width: "100%",
  },
}));

const Gallery = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <DisplayImage size="small" />
    </div>
  );
};

export default Gallery;
