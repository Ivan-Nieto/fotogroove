import React from "react";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";

import Gallery from "../gallery/Gallery";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "calc(100% - 40px)",

    padding: "0px 20px 0px 0px",
  },
  mainContent: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.grey[100],
    borderRadius: "10px",
  },
  item: {
    display: "inline-block",
    padding: "15px",
    width: "300px",
    height: "200px",
  },
}));

const MainPage = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <div className={classes.mainContent}>
        <div className={classes.item}>
          <Gallery />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
