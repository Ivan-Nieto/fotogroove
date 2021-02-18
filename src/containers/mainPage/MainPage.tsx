import React from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";

import Gallery from "../gallery/Gallery";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "100%",
    height: "100%",

    minWidth: "100%",

    overflowY: "hidden",
    overflowX: "hidden",
  },
  item: {
    height: "calc(100vh - 140px)",
    padding: "15px",

    overflowY: "scroll",
    marginRight: "-50px",
    paddingRight: "50px",
  },
}));

const MainPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <Gallery />
      </div>
    </div>
  );
};

export default MainPage;
